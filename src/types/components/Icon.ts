import { IconName } from "components/Shared/Icon/icons"

type colors = "black" | "blue" | "gray" | "green" | "orange" | "purple" | "red" | "white"

export interface IIcon {
  size?: number
  className?: string
  fill?: colors
  stroke?: colors
  name: IconName
}
