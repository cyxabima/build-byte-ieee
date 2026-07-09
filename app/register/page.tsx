"use client"

import { useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registrationSchema, type RegistrationFormData } from "@/lib/validations"
import { registerTeam } from "@/lib/actions"

const DEPARTMENTS =
  [
    "Civil Engineering",
    "Urban and Infrastructure Engineering",
    "Petroleum Engineering",
    "Earthquake Engineering",
    "Environmental Engineering",
    "Electrical Engineering",
    "Electronic Engineering",
    "Telecommunications Engineering",
    "Computer and Information Systems Engineering",
    "Bio-Medical Engineering",
    "Computer Science & Information Technology",
    "Software Engineering",
    "Mechanical Engineering",
    "Industrial and Manufacturing Engineering",
    "Textile Engineering",
    "Automotive and Marine Engineering",
    "Chemical Engineering",
    "Materials Engineering",
    "Metallurgical Engineering",
    "Polymer and Petrochemical Engineering",
    "Food Engineering"
  ]

export default function RegisterPage() {
  const [teamSize, setTeamSize] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      teamName: "",
      teamSize: 1,
      participants: [
        { name: "", email: "", department: "", rollNumber: "", phone: "" },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  })

  const updateTeamSize = (size: number) => {
    setTeamSize(size)
    form.setValue("teamSize", size)
    const currentSize = fields.length
    if (currentSize < size) {
      for (let i = currentSize; i < size; i++) {
        append({ name: "", email: "", department: "", rollNumber: "", phone: "" })
      }
    } else if (currentSize > size) {
      for (let i = currentSize; i > size; i--) {
        remove(i - 1)
      }
    }
  }

  async function onSubmit(data: RegistrationFormData) {
    setIsSubmitting(true)
    try {
      await registerTeam({ ...data, teamName: data.teamName ?? "" })
      toast.success("Registration successful! We will reach out to you soon.")
      form.reset()
      setTeamSize(1)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong. Please try again.")
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
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Register for BuildByte</h1>
            <p className="mt-3 text-muted-foreground">
              Register your team for the 24-hour hackathon. Solo participants welcome.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Details</CardTitle>
              <CardDescription>Tell us about your team and its members.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Team Name */}
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    placeholder="e.g. ByteBrigade (optional for solo)"
                    {...form.register("teamName")}
                  />
                </div>

                {/* Team Size */}
                <div className="space-y-2">
                  <Label>Team Size</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => updateTeamSize(size)}
                        className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${teamSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:bg-accent"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Participant Fields */}
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div key={field.id} className="rounded-lg border p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">Member {index + 1}</span>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              remove(index)
                              setTeamSize((s) => s - 1)
                            }}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`name-${index}`}>Full Name</Label>
                          <Input id={`name-${index}`} placeholder="John Doe" {...form.register(`participants.${index}.name`)} />
                          {form.formState.errors.participants?.[index]?.name && (
                            <p className="text-sm text-destructive">{form.formState.errors.participants[index]?.name?.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`email-${index}`}>Email</Label>
                          <Input id={`email-${index}`} type="email" placeholder="john@example.com" {...form.register(`participants.${index}.email`)} />
                          {form.formState.errors.participants?.[index]?.email && (
                            <p className="text-sm text-destructive">{form.formState.errors.participants[index]?.email?.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`department-${index}`}>Department</Label>
                          <Controller
                            control={form.control}
                            name={`participants.${index}.department`}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                  {DEPARTMENTS.map((dept) => (
                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {form.formState.errors.participants?.[index]?.department && (
                            <p className="text-sm text-destructive">{form.formState.errors.participants[index]?.department?.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`roll-${index}`}>Roll Number / ID</Label>
                          <Input id={`roll-${index}`} placeholder="EN-2024-XXXX" {...form.register(`participants.${index}.rollNumber`)} />
                          {form.formState.errors.participants?.[index]?.rollNumber && (
                            <p className="text-sm text-destructive">{form.formState.errors.participants[index]?.rollNumber?.message}</p>
                          )}
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor={`phone-${index}`}>Contact Number (WhatsApp)</Label>
                          <Input id={`phone-${index}`} placeholder="+92 300 1234567" {...form.register(`participants.${index}.phone`)} />
                          {form.formState.errors.participants?.[index]?.phone && (
                            <p className="text-sm text-destructive">{form.formState.errors.participants[index]?.phone?.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {teamSize < 3 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      const newSize = teamSize + 1
                      updateTeamSize(newSize)
                    }}
                  >
                    <Plus className="h-4 w-4" /> Add Member
                  </Button>
                )}

                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
