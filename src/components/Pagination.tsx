"use client"

import { JobFilterValues } from "@/lib/validation"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination"

interface PaginationJobsProps {
  currentPage: number
  totalPages: number
  filterValues: JobFilterValues
}

export default function PaginationJobs({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote },
}: PaginationJobsProps) {
  function changePage(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    })

    return `/?${searchParams.toString()}`
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button asChild disabled={currentPage === 1} variant={"outline"}>
            <Link href={changePage(1)}>First Page</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button asChild disabled={currentPage === 1} variant={"ghost"}>
            <Link href={changePage(currentPage - 1)}>
              <ChevronLeftIcon />
            </Link>
          </Button>
        </PaginationItem>
        <p className="hidden sm:block text-zinc-600 font-semibold dark:text-slate-300">
          Page {currentPage} of {totalPages}
        </p>
        <PaginationItem>
          <Button
            asChild
            disabled={currentPage === totalPages}
            variant={"ghost"}
          >
            <Link href={changePage(currentPage + 1)}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            asChild
            disabled={currentPage === totalPages}
            variant={"outline"}
          >
            <Link href={changePage(totalPages)}>Last Page</Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
