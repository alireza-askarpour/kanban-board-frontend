export interface IProps {
  href?: string
  style?: React.CSSProperties
  type?: "button" | "submit"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
