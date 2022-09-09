import { IIcon } from "types/components/Icon"
import { icons } from "./icons"

const colors = {
  black: "#171923",
  blue: "#048AFB",
  gray: "#6d6d6d",
  green: "#21A73F",
  orange: "#F6AD55",
  purple: "#3346F8",
  red: "#FF6161",
  white: "#ffffff",
}

export default function Icon({ name, size = 24, color = "black", className, variant = "outline" }: IIcon) {
  const IconElement = icons[name]

  if (!icons[name]) {
    throw new Error(`Icon ${name} not found`)
  }

  const fill = colors?.[color]

  return (
    <svg
      aria-label={name}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <IconElement variant={variant} />
    </svg>
  )
}
