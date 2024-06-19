import FilterJob from "@/components/FilterJob";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string
    type?: string
    location?: string
    remote?: string
  }
}


export default async function Home({ searchParams: { q, type, location, remote } }: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true"
  }

  return (
    <main className="max-w-5xl m-auto my-10 px-3 space-y-10">
      <div className="text-center space-y-5">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">All developer jobs</h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <FilterJob defaultValues={filterValues} />
        <JobResults />
      </section>
    </main>
  )
}
