"use client"

import { useState } from "react"
import { Search, LogOut, Users, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { logoutAdmin, exportParticipantsCsv } from "@/lib/actions"

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
}

export function Dashboard({ registrations }: { registrations: Registration[] }) {
  const [tab, setTab] = useState<"registrations" | "submissions">("registrations")
  const [query, setQuery] = useState("")

  const submissions = registrations.filter((r) => r.repoUrl)

  const filtered = registrations.filter((reg) => {
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

            {filtered.length === 0 ? (
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
                    {filtered.map((reg) => (
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
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
              <p className="text-sm text-muted-foreground">
                {submissions.length} team{submissions.length !== 1 ? "s" : ""} submitted a repo
              </p>
            </div>

            {submissions.length === 0 ? (
              <div className="rounded-lg border p-12 text-center">
                <p className="text-muted-foreground">No submissions yet.</p>
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Repo</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((reg) => (
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
                    ))}
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
