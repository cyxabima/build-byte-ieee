import mongoose from "mongoose"

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  rollNumber: { type: String, required: true },
  phone: { type: String, required: true },
})

const registrationSchema = new mongoose.Schema({
  teamName: { type: String, default: "" },
  teamSize: { type: Number, required: true, min: 1, max: 3 },
  participants: { type: [participantSchema], required: true, validate: [(v: unknown[]) => v.length >= 1 && v.length <= 3, "Team size must be 1-3"] },
  registeredAt: { type: Date, default: Date.now },
})

export const Registration = mongoose.models.Registration ?? mongoose.model("Registration", registrationSchema)
