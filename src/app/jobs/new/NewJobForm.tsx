"use client"

import H1 from "@/components/H1"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CreateJobValues, createJobSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import Select from "@/components/Select"
import { jobTypes, locationTypes } from "@/lib/job-types"
import LocationInput from "@/components/LocationInput"
import { X } from "lucide-react"
import { Label } from "@/components/ui/label"
import RichTextEditor from "@/components/RichTextEditor"
import { draftToMarkdown } from "markdown-draft-js"
import LoaderButton from "@/components/LoaderButton"
import { createJob } from "./action"

export default function NewJobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  })

  const {
    control,
    formState: { isSubmitting },
    trigger,
    watch,
    setValue,
    setFocus,
    handleSubmit,
  } = form

  const onSubmit = async (values: CreateJobValues) => {
    const formData = new FormData()

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value)
      }
    })

    try {
      await createJob(formData)
    } catch (error) {
      alert("Something went wrong, Please try again later.")
    }
  }

  return (
    <main className="max-w-3xl m-auto my-10">
      <div className="text-center space-y-6">
        <H1>Find your perfect developer</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers
        </p>
      </div>
      <div className="border p-3 rounded-lg my-8 space-y-6">
        <div>
          <h3 className="text-lg font-medium">Job details</h3>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue={""}>
                      <option value="" hidden>
                        Select an option
                      </option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyLogo"
              render={({ field: { value, ...feildValue } }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      {...feildValue}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target?.files?.[0]
                        feildValue.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue={""}
                      onChange={(e) => {
                        field.onChange(e)
                        if (e.currentTarget.value === "Remote") {
                          trigger("location")
                        }
                      }}
                    >
                      <option value="" hidden>
                        Select an option
                      </option>
                      {locationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Location</FormLabel>
                  <FormControl>
                    <LocationInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  {watch("location") && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setValue("location", "", { shouldValidate: true })
                        }}
                      >
                        <X size={20} />
                      </button>
                      <span className="text-sm">{watch("location")}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label>How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
                          <span className="mx-2">Or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            trigger("applicationEmail")
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>
                    Description
                  </Label>
                  <FormControl>
                    <RichTextEditor
                      {...field}
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoaderButton type="submit" loading={isSubmitting}>
              Submit
            </LoaderButton>
          </form>
        </Form>
      </div>
    </main>
  )
}
