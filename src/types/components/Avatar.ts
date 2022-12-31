import { ReactNode } from "react"

export interface IProps {
  variant: "circle" | "square"
  size: number
  children?: ReactNode
  src?: string
  alt?: string
}
