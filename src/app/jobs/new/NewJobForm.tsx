"use client"

import H1 from "@/components/H1"
import { Form } from "@/components/ui/form"
import { CreateJobValues, createJobSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export default function NewJobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  })
  return (
    <main className="max-w-3xl m-auto my-10">
      <div className="text-center space-y-4">
        <H1>Find your perfect developer</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers
        </p>
      </div>
      <div className="border p-3 rounded-lg my-8">
        <div>
          <h3 className="text-lg font-medium">Job details</h3>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form action="" className="space-y-3"></form>
        </Form>
      </div>
    </main>
  )
}
