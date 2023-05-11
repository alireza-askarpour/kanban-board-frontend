import { IIcon } from "../../../types/components/Icon"
import { classNames } from "../../../utils"
import { icons } from "./icons"

const colors = {
  black: "#171923",
  blue: "#048AFB",
  gray: "#939393",
  green: "#21A73F",
  orange: "#F6AD55",
  purple: "#3346F8",
  red: "#FF6161",
  white: "#ffffff",
}

export default function Icon({ name, size = 24, stroke = "black", className, fill }: IIcon) {
  const IconElement = icons[name]

  if (!icons[name]) {
    throw new Error(`Icon ${name} not found`)
  }

  const getFill = colors?.[fill] || "none"
  const getStroke = colors?.[stroke]

  return (
    <svg
      width={size}
      height={size}
      fill={getFill}
      xmlns="http://www.w3.org/2000/svg"
      stroke={getStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={classNames("feather feather-search", className)}
      viewBox="0 0 24 24"
    >
      <IconElement />
    </svg>
  )
}
