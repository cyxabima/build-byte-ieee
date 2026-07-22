"use client"

import { useState } from "react"
import { Search, LogOut, Users, GitBranch, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { logoutAdmin, exportParticipantsCsv, judgeTeam, removeJudgeFromTeam } from "@/lib/actions"

const JUDGES = ["Ukasha", "Zerwa", "Anas", "Noor", "Zainab", "Arooj"]

const CRITERIA = [
  { key: "innovation", label: "Innovation / Creativity", weight: 35 },
  { key: "technical", label: "Technical Execution", weight: 30 },
  { key: "impact", label: "Impact / Practicality", weight: 20 },
  { key: "challenge", label: "Challenge Alignment", weight: 15 },
] as const

type Judgment = {
  judge: string
  innovation: number | null
  technical: number | null
  impact: number | null
  challenge: number | null
}

type Registration = {
  _id: string
  teamName: string
  teamSize: number
  participants: { name: string; email: string; department: string; rollNumber: string; phone: string }[]
  repoUrl: string
  registeredAt: string
  submittedAt: string | null
  judgments: Judgment[]
}

type ScoreFilter = "all" | "judged" | "unjudged" | "high" | "mid" | "low"

function calcJudgeScore(j: Judgment): number | null {
  const scored = CRITERIA.filter((c) => j[c.key] != null)
  if (scored.length === 0) return null
  const weightedSum = scored.reduce((sum, c) => sum + (j[c.key] as number) * c.weight, 0)
  const totalWeight = scored.reduce((sum, c) => sum + c.weight, 0)
  return Math.round((weightedSum / (totalWeight * 5)) * 100)
}

function calcTeamScore(judgments: Judgment[]): number | null {
  const scores = judgments.map(calcJudgeScore).filter((s): s is number => s != null)
  if (scores.length === 0) return null
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

function scoreBadgeClass(score: number | null): string {
  if (score == null) return "bg-muted text-muted-foreground border-muted-foreground/30"
  if (score >= 75) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  if (score >= 50) return "bg-amber-500/20 text-amber-400 border-amber-500/30"
  return "bg-red-500/20 text-red-400 border-red-500/30"
}

function clampScore(v: string): string {
  if (v === "") return ""
  const n = Math.floor(Number(v))
  if (isNaN(n)) return ""
  if (n < 1) return "1"
  if (n > 5) return "5"
  return String(n)
}

export function Dashboard({ registrations }: { registrations: Registration[] }) {
  const [tab, setTab] = useState<"registrations" | "submissions">("registrations")
  const [query, setQuery] = useState("")
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all")
  const [addingFor, setAddingFor] = useState<string | null>(null)
  const [newJudge, setNewJudge] = useState("")
  const [scores, setScores] = useState<{ innovation: string; technical: string; impact: string; challenge: string }>({
    innovation: "", technical: "", impact: "", challenge: "",
  })

  const submissions = registrations.filter((r) => r.repoUrl)

  const filteredRegistrations = registrations.filter((reg) => {
    if (!query) return true
    const q = query.toLowerCase()
    const matchesTeam = reg.teamName?.toLowerCase().includes(q)
    const matchesParticipant = reg.participants.some(
      (p) => p.name.toLowerCase().includes(q) || p.department.toLowerCase().includes(q) || p.email.toLowerCase().includes(q),
    )
    return matchesTeam || matchesParticipant
  })

  const filteredSubmissions = submissions.filter((reg) => {
    if (!query) return true
    const q = query.toLowerCase()
    const matchesTeam = reg.teamName?.toLowerCase().includes(q)
    const matchesParticipant = reg.participants.some(
      (p) => p.name.toLowerCase().includes(q) || p.department.toLowerCase().includes(q) || p.email.toLowerCase().includes(q),
    )
    return matchesTeam || matchesParticipant
  })

  const judgedSubmissions = filteredSubmissions.filter((reg) => {
    if (scoreFilter === "all") return true
    if (scoreFilter === "unjudged") return reg.judgments.length === 0
    if (scoreFilter === "judged") return reg.judgments.length > 0
    const avg = calcTeamScore(reg.judgments)
    if (avg == null) return false
    if (scoreFilter === "high") return avg >= 75
    if (scoreFilter === "mid") return avg >= 50 && avg < 75
    if (scoreFilter === "low") return avg < 50
    return true
  })

  const counts = { all: filteredSubmissions.length, judged: 0, unjudged: 0, high: 0, mid: 0, low: 0 }
  for (const reg of filteredSubmissions) {
    if (reg.judgments.length === 0) counts.unjudged++
    else counts.judged++
    const avg = calcTeamScore(reg.judgments)
    if (avg != null) {
      if (avg >= 75) counts.high++
      else if (avg >= 50) counts.mid++
      else counts.low++
    }
  }

  function livePreviewScore(): number | null {
    const scored = CRITERIA.filter((c) => scores[c.key] !== "" && scores[c.key] !== "0")
    if (scored.length === 0) return null
    const weightedSum = scored.reduce((sum, c) => sum + Number(scores[c.key]) * c.weight, 0)
    const totalWeight = scored.reduce((sum, c) => sum + c.weight, 0)
  return Math.round((weightedSum / (totalWeight * 5)) * 100)
  }

  function resetForm() {
    setAddingFor(null)
    setNewJudge("")
    setScores({ innovation: "", technical: "", impact: "", challenge: "" })
  }

  function updateScore(key: "innovation" | "technical" | "impact" | "challenge", raw: string) {
    setScores({ ...scores, [key]: clampScore(raw) })
  }

  async function handleAddJudge(regId: string) {
    if (!newJudge) return
    const payload: { innovation?: number | null; technical?: number | null; impact?: number | null; challenge?: number | null } = {}
    for (const c of CRITERIA) {
      payload[c.key] = scores[c.key] !== "" && scores[c.key] !== "0" ? Number(scores[c.key]) : null
    }
    await judgeTeam(regId, newJudge, payload)
    resetForm()
  }

  async function handleRemoveJudge(regId: string, judge: string) {
    await removeJudgeFromTeam(regId, judge)
  }

  function getAvailableJudges(reg: Registration) {
    const used = new Set(reg.judgments.map((j) => j.judge))
    return JUDGES.filter((j) => !used.has(j))
  }

  const addingTeam = addingFor ? registrations.find((r) => r._id === addingFor) : null
  const availableForAdding = addingTeam ? getAvailableJudges(addingTeam) : JUDGES

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-semibold">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 text-sm"
              onClick={async () => {
                const csv = await exportParticipantsCsv()
                const blob = new Blob([csv], { type: "text/csv" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "participants.csv"
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              Import Participants Sheet
            </Button>
            <form action={logoutAdmin}>
              <Button variant="ghost" type="submit" className="gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border p-1 w-fit">
          <button
            type="button"
            onClick={() => setTab("registrations")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "registrations" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4" />
            Registrations
            <span className="ml-1 text-xs opacity-70">({registrations.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("submissions")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "submissions" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GitBranch className="h-4 w-4" />
            Submissions
            <span className="ml-1 text-xs opacity-70">({submissions.length})</span>
          </button>
        </div>

        {tab === "registrations" && (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Registrations</h1>
                <p className="text-sm text-muted-foreground">
                  {registrations.length} team{registrations.length !== 1 ? "s" : ""} registered
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search teams, members, departments..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {filteredRegistrations.length === 0 ? (
              <div className="rounded-lg border p-12 text-center">
                <p className="text-muted-foreground">{query ? "No teams match your search." : "No registrations yet."}</p>
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">S.No</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((reg, index) => (
                      <TableRow key={reg._id}>
                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                        <TableCell className="font-medium">{reg.teamName || "Solo"}</TableCell>
                        <TableCell>{reg.teamSize}</TableCell>
                        <TableCell>
                          <ul className="space-y-1">
                            {reg.participants.map((p, i) => (
                              <li key={i} className="text-sm">
                                <span className="font-medium">{p.name}</span>
                                <span className="text-muted-foreground">
                                  {" "}&middot; {p.department} &middot; {p.email} &middot; {p.phone}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(reg.registeredAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}

        {tab === "submissions" && (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
                <p className="text-sm text-muted-foreground">
                  {submissions.length} team{submissions.length !== 1 ? "s" : ""} submitted a repo
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search teams, members..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Filter pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {(["all", "judged", "unjudged", "high", "mid", "low"] as ScoreFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setScoreFilter(f)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    scoreFilter === f
                      ? f === "high"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                        : f === "mid"
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                          : f === "low"
                            ? "bg-red-500/20 text-red-400 border-red-500/40"
                            : f === "unjudged"
                              ? "bg-muted text-muted-foreground border-muted-foreground/30"
                              : "bg-primary text-primary-foreground border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                  <span className="ml-1 opacity-70">({counts[f]})</span>
                </button>
              ))}
            </div>

            {judgedSubmissions.length === 0 ? (
              <div className="rounded-lg border p-12 text-center">
                <p className="text-muted-foreground">
                  {query || scoreFilter !== "all" ? "No teams match your filters." : "No submissions yet."}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">S.No</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Repo</TableHead>
                      <TableHead>Judgments</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {judgedSubmissions.map((reg, index) => {
                      const available = getAvailableJudges(reg)
                      const teamAvg = calcTeamScore(reg.judgments)
                      return (
                        <TableRow key={reg._id}>
                          <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                          <TableCell className="font-medium">{reg.teamName || "Solo"}</TableCell>
                          <TableCell>
                            <ul className="space-y-1">
                              {reg.participants.map((p, i) => (
                                <li key={i} className="text-sm">
                                  <span className="font-medium">{p.name}</span>
                                  <span className="text-muted-foreground"> &middot; {p.email}</span>
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell>
                            <a
                              href={reg.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              Open Repo <GitBranch className="h-3 w-3" />
                            </a>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-2">
                              {reg.judgments.map((j) => {
                                const score = calcJudgeScore(j)
                                const scored = CRITERIA.filter((c) => j[c.key] != null)
                                return (
                                  <div key={j.judge} className="flex items-center gap-1.5">
                                    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${scoreBadgeClass(score)}`}>
                                      {j.judge}: {score != null ? `${score}/100` : "\u2014"}
                                    </span>
                                    {scored.length > 0 && (
                                      <span className="text-[10px] text-muted-foreground">
                                        {scored.map((c) => `${c.label[0]}${j[c.key]}`).join(" ")}
                                      </span>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveJudge(reg._id, j.judge)}
                                      className="text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                )
                              })}

                              {teamAvg != null && reg.judgments.length > 1 && (
                                <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-bold ${scoreBadgeClass(teamAvg)}`}>
                                  AVG: {teamAvg}/100
                                </span>
                              )}

                              {reg.judgments.length < 3 && available.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => setAddingFor(reg._id)}
                                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
                                >
                                  <Plus className="h-3 w-3" /> Add Judge
                                </button>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {reg.submittedAt ? new Date(reg.submittedAt).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
                            }) : "\u2014"}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Judge Dialog */}
      <Dialog open={addingFor !== null} onOpenChange={(open: boolean) => { if (!open) resetForm() }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {addingTeam ? `Add Judge \u2014 ${addingTeam.teamName || "Solo"}` : "Add Judge"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Judge</label>
              <Select value={newJudge} onValueChange={setNewJudge}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select judge" />
                </SelectTrigger>
                <SelectContent>
                  {availableForAdding.map((j) => (
                    <SelectItem key={j} value={j}>{j}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CRITERIA.map((c) => (
                <div key={c.key}>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    {c.label} <span className="opacity-60">({c.weight}%)</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    step={1}
                    value={scores[c.key]}
                    onChange={(e) => updateScore(c.key, e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="1 to 5"
                  />
                </div>
              ))}
            </div>

            {newJudge && livePreviewScore() != null && (
              <div className={`inline-flex items-center rounded border px-3 py-1 text-sm font-semibold ${scoreBadgeClass(livePreviewScore())}`}>
                Weighted score: {livePreviewScore()}/100
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button disabled={!newJudge} onClick={() => addingFor && handleAddJudge(addingFor)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
