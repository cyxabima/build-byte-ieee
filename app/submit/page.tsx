"use client"

import { useState } from "react"
import { ArrowLeft, Loader2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { lookupTeamByEmail, submitRepo } from "@/lib/actions"

type TeamInfo = {
  _id: string
  teamName: string
  participants: { name: string; email: string }[]
  repoUrl: string
}

export default function SubmitPage() {
  const [step, setStep] = useState<"email" | "repo">("email")
  const [lookupEmail, setLookupEmail] = useState("")
  const [team, setTeam] = useState<TeamInfo | null>(null)
  const [repoUrl, setRepoUrl] = useState("")
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    if (!lookupEmail) return
    setIsLookingUp(true)
    try {
      const result = await lookupTeamByEmail(lookupEmail)
      if (!result) {
        toast.error("No team found with that email address.")
        return
      }
      setTeam(result)
      setRepoUrl("")
      setStep("repo")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLookingUp(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!repoUrl.trim() || !team) return
    setIsSubmitting(true)
    try {
      await submitRepo(team.participants[0].email, repoUrl.trim())
      toast.success("Repository submitted successfully!")
      setStep("email")
      setLookupEmail("")
      setTeam(null)
      setRepoUrl("")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Submit Your Repo</h1>
            <p className="mt-3 text-muted-foreground">
              Enter any team member&apos;s email to look up your team, then submit your repository link.
            </p>
          </div>

          {step === "email" && (
            <Card>
              <CardHeader>
                <CardTitle>Find Your Team</CardTitle>
                <CardDescription>
                  Use the email address any team member registered with.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLookup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lookup-email">Email Address</Label>
                    <Input
                      id="lookup-email"
                      type="email"
                      placeholder="john@example.com"
                      value={lookupEmail}
                      onChange={(e) => setLookupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={isLookingUp}>
                    {isLookingUp ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Looking up...</>
                    ) : (
                      "Look Up Team"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === "repo" && team && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{team.teamName || "Solo Participant"}</CardTitle>
                  <CardDescription>Team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {team.participants.map((p, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-medium">{p.name}</span>
                        <span className="text-muted-foreground"> &middot; {p.email}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Repository Link</CardTitle>
                  <CardDescription>
                    Paste your GitHub/GitLab/etc. repository URL. You can resubmit to update it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="repo-url">Repo URL</Label>
                      <Input
                        id="repo-url"
                        type="url"
                        placeholder="https://github.com/username/repo"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                      ) : (
                        <><ExternalLink className="h-4 w-4" /> Submit Repo</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <p className="text-center text-xs text-muted-foreground">
                By submitting, you confirm this is your team&apos;s work.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
