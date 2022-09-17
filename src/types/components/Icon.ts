import { IconName } from "components/Shared/Icon/icons"

export interface IIcon {
  size?: number
  className?: string
  variant?: "outline" | "bold"
  color?: "black" | "blue" | "gray" | "green" | "orange" | "purple" | "red" | "white"
  name: IconName
}
