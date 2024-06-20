import { z } from "zod"
import { jobTypes, locationTypes } from "./job-types"

const requiredString = z.string().min(1, { message: "Reauired" }).max(100)
const numaricRequiredString = requiredString.regex(/^\d+$/, {
  message: "Must be a number",
})

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    { message: "File must be an image" }
  )
  .refine(
    (file) => {
      return !file || file.size < 1024 * 1024 * 2
    },
    { message: "Image size must be less than 2 MB" }
  )

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  })

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (location) => locationTypes.includes(location),
      { message: "Invalid location type" }
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    { message: "location is requried for on-site jobs", path: ["location"] }
  )

export const createJobSchema = z
  .object({
    title: requiredString,
    type: requiredString.refine((type) => jobTypes.includes(type), {
      message: "Invalid job type",
    }),
    companyName: requiredString,
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numaricRequiredString.max(9, {
      message: "Number can not be longer than 9 digits",
    }),
  })
  .and(applicationSchema)
  .and(locationSchema)

export type CreateJobValues = z.infer<typeof createJobSchema>

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
})

export type JobFilterValues = z.infer<typeof jobFilterSchema>
