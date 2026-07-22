"use client"

import { useState } from "react"
import { Search, LogOut, Users, GitBranch, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { logoutAdmin, exportParticipantsCsv, judgeTeam, removeJudgeFromTeam } from "@/lib/actions"

const JUDGES = ["Ukasha", "Zerwa", "Anas", "Noor", "Zainab", "Arooj"]

const VERDICT_COLORS: Record<string, string> = {
  great: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  okay: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
}

type Judgment = { judge: string; verdict: string }

type Registration = {
  _id: string
  teamName: string
  teamSize: number
  participants: {
    name: string
    email: string
    department: string
    rollNumber: string
    phone: string
  }[]
  repoUrl: string
  registeredAt: string
  submittedAt: string | null
  judgments: Judgment[]
}

type JudgmentFilter = "all" | "great" | "okay" | "rejected" | "unjudged"

export function Dashboard({ registrations }: { registrations: Registration[] }) {
  const [tab, setTab] = useState<"registrations" | "submissions">("registrations")
  const [query, setQuery] = useState("")
  const [judgmentFilter, setJudgmentFilter] = useState<JudgmentFilter>("all")
  const [addingFor, setAddingFor] = useState<string | null>(null)
  const [newJudge, setNewJudge] = useState("")
  const [newVerdict, setNewVerdict] = useState<"great" | "okay" | "rejected">("great")

  const submissions = registrations.filter((r) => r.repoUrl)

  const filteredRegistrations = registrations.filter((reg) => {
    if (!query) return true
    const q = query.toLowerCase()
    const matchesTeam = reg.teamName?.toLowerCase().includes(q)
    const matchesParticipant = reg.participants.some(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q),
    )
    return matchesTeam || matchesParticipant
  })

  const filteredSubmissions = submissions.filter((reg) => {
    if (!query) return true
    const q = query.toLowerCase()
    const matchesTeam = reg.teamName?.toLowerCase().includes(q)
    const matchesParticipant = reg.participants.some(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q),
    )
    return matchesTeam || matchesParticipant
  })

  const judgedSubmissions = filteredSubmissions.filter((reg) => {
    if (judgmentFilter === "all") return true
    if (judgmentFilter === "unjudged") return reg.judgments.length === 0
    return reg.judgments.some((j) => j.verdict === judgmentFilter)
  })

  const getJudgmentCounts = () => {
    const counts: Record<JudgmentFilter, number> = { all: 0, great: 0, okay: 0, rejected: 0, unjudged: 0 }
    for (const reg of filteredSubmissions) {
      counts.all++
      if (reg.judgments.length === 0) {
        counts.unjudged++
      } else {
        for (const j of reg.judgments) {
          if (j.verdict in counts) counts[j.verdict as JudgmentFilter]++
        }
      }
    }
    return counts
  }

  const counts = getJudgmentCounts()

  async function handleAddJudge(regId: string) {
    if (!newJudge) return
    await judgeTeam(regId, newJudge, newVerdict)
    setAddingFor(null)
    setNewJudge("")
    setNewVerdict("great")
  }

  async function handleRemoveJudge(regId: string, judge: string) {
    await removeJudgeFromTeam(regId, judge)
  }

  function getAvailableJudges(reg: Registration) {
    const used = new Set(reg.judgments.map((j) => j.judge))
    return JUDGES.filter((j) => !used.has(j))
  }

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
              tab === "registrations"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
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
              tab === "submissions"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
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
                <p className="text-muted-foreground">
                  {query ? "No teams match your search." : "No registrations yet."}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((reg) => (
                      <TableRow key={reg._id}>
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
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
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

            {/* Judgment filter pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {(["all", "great", "okay", "rejected", "unjudged"] as JudgmentFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setJudgmentFilter(f)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    judgmentFilter === f
                      ? f === "great"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                        : f === "okay"
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                          : f === "rejected"
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
                  {query || judgmentFilter !== "all" ? "No teams match your filters." : "No submissions yet."}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Repo</TableHead>
                      <TableHead>Judgments</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {judgedSubmissions.map((reg) => {
                      const available = getAvailableJudges(reg)
                      return (
                        <TableRow key={reg._id}>
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
                            <div className="flex flex-col gap-1.5">
                              {reg.judgments.map((j) => (
                                <div key={j.judge} className="flex items-center gap-1.5">
                                  <span
                                    className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${VERDICT_COLORS[j.verdict] ?? "bg-muted text-muted-foreground"}`}
                                  >
                                    {j.judge}: {j.verdict}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveJudge(reg._id, j.judge)}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}

                              {addingFor === reg._id ? (
                                <div className="flex items-center gap-1.5 mt-1">
                                  <Select value={newJudge} onValueChange={setNewJudge}>
                                    <SelectTrigger className="h-7 w-28 text-xs">
                                      <SelectValue placeholder="Judge" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {available.map((j) => (
                                        <SelectItem key={j} value={j}>{j}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Select value={newVerdict} onValueChange={(v) => setNewVerdict(v as "great" | "okay" | "rejected")}>
                                    <SelectTrigger className="h-7 w-24 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="great">Great</SelectItem>
                                      <SelectItem value="okay">Okay</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 px-2"
                                    onClick={() => handleAddJudge(reg._id)}
                                    disabled={!newJudge}
                                  >
                                    Save
                                  </Button>
                                  <button
                                    type="button"
                                    onClick={() => { setAddingFor(null); setNewJudge(""); setNewVerdict("great") }}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ) : reg.judgments.length < 3 && available.length > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => setAddingFor(reg._id)}
                                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
                                >
                                  <Plus className="h-3 w-3" /> Add Judge
                                </button>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {reg.submittedAt ? new Date(reg.submittedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }) : "—"}
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
    </div>
  )
}
