import JobDetailsPage from "@/components/JobDetailsPage"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"

interface PageProps {
  params: { slug: string }
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  })

  if (!job) notFound()

  return job
})

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  })

  return jobs.map(({ slug }) => slug)
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug)

  return {
    title: job.title,
  }
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug)

  const { applicationEmail, applicationUrl } = job

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl

  if (!applicationLink) {
    console.error("Job has no application link or email")
    notFound()
  }

  return (
    <main className="m-auto max-w-5xl my-10 px-3 flex flex-col gap-5 items-center justify-between md:flex-row md:items-start">
      <JobDetailsPage job={job!} />
      <aside>
        <Button>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  )
}
