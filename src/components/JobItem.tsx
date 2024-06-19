import { Job } from "@prisma/client"
import Image from "next/image"
import placeholder from "@/assets/company-logo-placeholder.png"
import { Banknote, Briefcase, Clock, Earth, MapPin } from "lucide-react"
import { formatDate, formatMoney } from "@/lib/utils"

interface JobItemProps {
  job: Job
}

export default function JobItem({
  job: {
    title,
    type,
    companyName,
    companyLogoUrl,
    salary,
    createdAt,
    location,
    locationType,
  },
}: JobItemProps) {
  return (
    <article className="flex rounded-lg border gap-3 p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || placeholder}
        alt="Company Logo"
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground font-medium">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Earth size={16} className="shrink-0" />
            {location ? location : "WorldWide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <span className="rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
          {type}
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {formatDate(createdAt)}
        </span>
      </div>
    </article>
  )
}
