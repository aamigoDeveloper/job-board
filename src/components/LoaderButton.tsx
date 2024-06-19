import { ButtonHTMLAttributes } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

interface LoaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean
}

export default function LoaderButton({
  children,
  loading,
  ...props
}: LoaderButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center gap-1 justify-center">
        {children}
        {loading && <Loader2 size={16} className="animate-spin" />}
      </span>
    </Button>
  )
}
