import { Link } from "react-router-dom"
import { IProps } from "../../../types/components/IconButton"
import { classNames } from "../../../utils/classNames"

const IconButton = (props: IProps) => {
  const size = props.size || "md"

  const handleClickButton = () => {
    if (props.disabled) return
    if (typeof props.onClick === "function") props.onClick()
  }

  const elementProps = {
    onClick: handleClickButton,
    type: props.type || "button",
    disabled: props.disabled,
    style: props.style,
    className: classNames(
      props.className,
      "border border-transparent",
      "grid place-items-center",
      "rounded-full cursor-pointer select-none",
      "transition duration-150 ease-in-out",
      "appearance-none focus:outline-none bg-[#F7F7F7]",

      props.disabled && "cursor-not-allowed opacity-50 hover:opacity-50",

      size === "lg" && "w-12 h-12",
      size === "md" && "w-10 h-10",
      size === "sm" && "w-8 h-8",
    ),
  }

  return props.href ? (
    <Link to={props.href} style={{ appearance: "none" }} {...elementProps}>
      {props.children}
    </Link>
  ) : (
    <button {...elementProps}>{props.children}</button>
  )
}

export default IconButton
