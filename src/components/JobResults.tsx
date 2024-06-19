import prisma from "@/lib/db"
import Link from "next/link"
import JobItem from "./JobItem"
import { JobFilterValues } from "@/lib/validation"
import { Prisma } from "@prisma/client"
import PaginationJobs from "./Pagination"

interface JobResultsProps {
  filterValues: JobFilterValues
  page?: number
}

export default async function JobResults({
  filterValues,
  page = 1,
}: JobResultsProps) {
  const { q, type, location, remote } = filterValues

  const jobsPerPage = 6
  const skip = (page - 1) * jobsPerPage

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

  const totalJobsPromise = prisma.job.count({ where })

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  })

  const [jobs, totalJobs] = await Promise.all([jobsPromise, totalJobsPromise])

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
      {jobs.length > 0 && (
        <PaginationJobs
          currentPage={page}
          totalPages={Math.ceil(totalJobs / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  )
}
