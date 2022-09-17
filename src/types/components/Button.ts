export interface IProps {
  href?: string
  className?: string

  loading?: boolean
  disabled?: boolean

  type?: "button" | "submit" | "reset"
  size?: "small" | "medium" | "large"
  variant?: "primary" | "secondary" | "outline-primary"

  children?: React.ReactNode
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode

  onClick?: () => void
}
