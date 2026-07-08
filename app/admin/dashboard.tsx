"use client"

import { useState } from "react"
import { Search, LogOut, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { logoutAdmin } from "@/lib/actions"

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
  registeredAt: string
}

export function Dashboard({ registrations }: { registrations: Registration[] }) {
  const [query, setQuery] = useState("")

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
          <form action={logoutAdmin}>
            <Button variant="ghost" type="submit" className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </form>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
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
      </div>
    </div>
  )
}
