"use server"

import prisma from "@/lib/db"
import { toSlug } from "@/lib/utils"
import { createJobSchema } from "@/lib/validation"
import { nanoid } from "nanoid"
import { put } from "@vercel/blob"
import { redirect } from "next/navigation"
import path from "path"

export const createJob = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries())

  const {
    title,
    type,
    companyName,
    locationType,
    location,
    companyLogo,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values)

  const slug = `${toSlug(title)}-${nanoid(10)}`

  let companyLogoUrl: string | undefined = undefined

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      }
    )

    companyLogoUrl = blob.url
  }

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

  redirect("/job-submitted")
}
