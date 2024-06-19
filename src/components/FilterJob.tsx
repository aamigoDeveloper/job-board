import { JobFilterValues } from "@/lib/validation"
import FormSubmittingButton from "./FormSubmittingButton"
import Select from "./Select"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { jobTypes } from "@/lib/job-types"
import prisma from "@/lib/db"

interface FilterJobProps {
  defaultValues: JobFilterValues
}

export default async function FilterJob({
  defaultValues: { q, type, location, remote },
}: FilterJobProps) {
  const distincsLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[]

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              placeholder="Type, company, etc..."
              id="q"
              name="q"
              defaultValue={q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="types">Types</Label>
            <Select id="types" name="types" defaultValue={type || ""}>
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={location || ""}>
              <option value="">All Locations</option>
              {distincsLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remote" name="remote" defaultChecked={remote} />
            <Label htmlFor="remote">Remote</Label>
          </div>
          <FormSubmittingButton className="w-full">
            Filter jobs
          </FormSubmittingButton>
        </div>
      </form>
    </aside>
  )
}
