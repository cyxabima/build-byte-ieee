import { z } from "zod"

const participantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
  rollNumber: z.string().min(1, "Roll Number is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\+?[\d\s\-()]+$/, "Invalid phone number"),
})

export const registrationSchema = z.object({
  teamName: z.string().optional(),
  teamSize: z.number().min(1).max(4),
  participants: z.array(participantSchema).min(1).max(4),
})

export type RegistrationInput = z.input<typeof registrationSchema>

export type RegistrationFormData = z.infer<typeof registrationSchema>
export type ParticipantData = z.infer<typeof participantSchema>
