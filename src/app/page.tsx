import FilterJob from "@/components/FilterJob"
import H1 from "@/components/H1"
import JobResults from "@/components/JobResults"
import { JobFilterValues } from "@/lib/validation"

interface PageProps {
  searchParams: {
    q?: string
    type?: string
    location?: string
    remote?: string
    page?: string
  }
}

export default async function Home({
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  }

  return (
    <main className="max-w-5xl m-auto my-10 px-3 space-y-10">
      <div className="text-center space-y-5">
        <H1>All developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <FilterJob defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  )
}
