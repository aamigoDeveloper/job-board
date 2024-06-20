"use server"

import prisma from "@/lib/db"
import { toSlug } from "@/lib/utils"
import { createJobSchema } from "@/lib/validation"
import { nanoid } from "nanoid"
import { redirect } from "next/navigation"

export const createJob = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries())

  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values)

  const slug = `${toSlug(title)}-${nanoid(10)}`

  await prisma.job.create({
    data: {
      title: title.trim(),
      slug,
      type,
      companyName: companyName.trim(),
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
    },
  })

  redirect('/')
}
