import prisma from "@/lib/db"
import Link from "next/link"
import JobItem from "./JobItem"

export default async function JobResults() {  
  const jobs = await prisma.job.findMany()

  return (
    <div className="grow space-y-3">
    {jobs.map((job) => (
      <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
        <JobItem job={job} />
      </Link>
    ))}
  </div>
  )
}