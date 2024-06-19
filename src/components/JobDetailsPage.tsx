import { Job } from "@prisma/client"
import Image from "next/image"
import Markdown from "./Markdown"
import Link from "next/link"
import { Banknote, Briefcase, EarthIcon, MapPin } from "lucide-react"
import { formatMoney } from "@/lib/utils"

interface JobDetailsPageProps {
  job: Job
}

export default function JobDetailsPage({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
  },
}: JobDetailsPageProps) {
  return (
    <section className="w-full grow space-y-4">
      <div>
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company Logo"
            width={100}
            height={100}
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-bold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-green-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span className="font-bold">{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <EarthIcon size={16} />
              {location}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  )
}
