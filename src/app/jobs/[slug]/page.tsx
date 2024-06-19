import JobDetailsPage from "@/components/JobDetailsPage"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug },
  })

  return (
    <main className="m-auto max-w-5xl my-10 px-3 flex flex-col gap-5 items-center justify-between md:flex-row md:items-start">
      <JobDetailsPage job={job!} />
      <aside>
        <Button>Apply now</Button>
      </aside>
    </main>
  )
}
