import { ReactNode } from "react"

export interface IProps {
  className?: string
  variant: "primary" | "secondary"
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
  size: number
  children?: ReactNode
  src?: string
  alt?: string
  fontSize?: number
}
