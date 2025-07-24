import { toast as sonnerToast } from "sonner"

export function useToast() {
  return {
    toast: ({
      title,
      description,
      variant = "default",
      ...props
    }: {
      title?: string
      description?: string
      variant?: "default" | "destructive"
      [key: string]: any
    }) => {
      if (variant === "destructive") {
        sonnerToast.error(title, {
          description,
          ...props
        })
      } else {
        sonnerToast.success(title, {
          description,
          ...props
        })
      }
    },
    dismiss: sonnerToast.dismiss
  }
}
