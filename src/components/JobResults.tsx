import prisma from "@/lib/db"
import Link from "next/link"
import JobItem from "./JobItem"
import { JobFilterValues } from "@/lib/validation"
import { Prisma } from "@prisma/client"

interface JobResultsProps {
  filterValues: JobFilterValues
}

export default async function JobResults({
  filterValues: { q, type, location, remote },
}: JobResultsProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ")

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { type: { contains: searchString } },
          { companyName: { contains: searchString } },
          { location: { contains: searchString } },
          { locationType: { contains: searchString } },
        ],
      }
    : {}

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="grow space-y-3">
      {jobs.map((job) => (
        <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
          <JobItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No Jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  )
}
