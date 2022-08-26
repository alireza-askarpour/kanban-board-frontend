export interface IProps {
  type?: string
  value?: string
  placeholder?: string
  name?: string
  id?: string
  className?: string
  inputClassName?: string
  disabled?: boolean
  icon?: any
  status?: "success" | "error"
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}
