import prisma from "@/lib/db"
import Image from "next/image"
import placeholder from "@/assets/company-logo-placeholder.png"
import Link from "next/link"
import { Banknote, Briefcase, Clock, Earth, MapPin } from "lucide-react"

export default async function Home() {
  const jobs = await prisma.job.findMany()

  return (
    <main className="max-w-5xl m-auto my-10 px-3 space-y-10">
      <div className="text-center space-y-5">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">All developer jobs</h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <aside className="w-[30%]">Filter jobs</aside>
        <div className="grow space-y-3">
          {jobs.map((job) => (
            <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
              <article className="flex rounded-lg border gap-3 p-5 hover:bg-muted/60">
                <Image
                  src={job.companyLogoUrl || placeholder}
                  alt="Company Logo"
                  width={100}
                  height={100}
                  className="self-center rounded-lg"
                />
                <div className="flex-grow space-y-3">
                  <div>
                    <h2 className="text-xl font-medium">{job.title}</h2>
                    <p className="text-muted-foreground">{job.companyName}</p>
                  </div>
                  <div className="text-muted-foreground">
                    <p className="flex items-center gap-1.5 sm:hidden">
                      <Briefcase size={16} className="shrink-0" />
                      {job.type}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin size={16} className="shrink-0" />
                      {job.locationType}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Earth size={16} className="shrink-0" />
                      {job.location ? job.location : "WorldWide"}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Banknote size={16} className="shrink-0" />
                      {job.salary}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
                  <span className="rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={16} />
                    {job.createdAt.toISOString()}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
