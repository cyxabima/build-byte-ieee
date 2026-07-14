import { connectDB } from "../lib/db"
import { Registration } from "../lib/schemas"

async function fixPhoneNumbers() {
  await connectDB()

  const registrations = await Registration.find({})
  let updated = 0

  for (const reg of registrations) {
    let changed = false

    for (const p of reg.participants) {
      if (!p.phone) continue

      let cleaned = p.phone.replace(/[\s-]/g, "")
      if (cleaned.startsWith("0")) cleaned = "+92" + cleaned.slice(1)
      else if (cleaned.startsWith("92") && !cleaned.startsWith("+")) cleaned = "+" + cleaned

      if (cleaned !== p.phone) {
        p.phone = cleaned
        changed = true
      }
    }

    if (changed) {
      await reg.save()
      updated++
    }
  }

  console.log(`Updated ${updated} registrations`)
  process.exit(0)
}

fixPhoneNumbers().catch((e) => {
  console.error(e)
  process.exit(1)
})
