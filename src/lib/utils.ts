import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: Date) {
  const date = formatDistanceToNowStrict(dateStr)

  return `${date} ago`
}

export function formatMoney(
  amount: number,
  currency = "USD",
  locale = "en-US"
) {
  return Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  )
}
