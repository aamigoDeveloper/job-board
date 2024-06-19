"use client"

import { ButtonHTMLAttributes } from "react"
import { useFormStatus } from "react-dom"
import LoaderButton from "./LoaderButton"

export default function FormSubmittingButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()

  return <LoaderButton type="submit" {...props} loading={pending} />
}
