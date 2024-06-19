import FormSubmittingButton from "./FormSubmittingButton"
import Select from "./Select"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function FilterJob() {
  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4">
      <form>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input placeholder="Type, company, etc..." id="q" name="q" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="types">Types</Label>
            <Select id="types" name="types">
              <option value="">All Types</option>
              {}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location">
              <option value="">All Locations</option>
              {}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remote" name="remote" />
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
