import { useState } from "react"

import { IProps } from "../../../types/components/Input"
import { classNames } from "../../../utils/classNames"

import styles from "./Input.module.css"
import Icon from "../Icon/Icon"

const Input = (props: IProps) => {
  const [inputType, setInputType] = useState(props.type || "text")
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
    setInputType(inputType === "password" ? "text" : "password")
  }

  const className = [props.className, styles.FormControl]
  if (props.icon) className.push(styles.Icon)

  if (props.status === "error") className.push(styles.Error)
  else if (props.status === "success") className.push(styles.Success)

  return (
    <div className={className.join(" ")}>
      <input
        id={props.id}
        name={props.name}
        type={inputType}
        placeholder={props.placeholder}
        className={classNames(
          props.inputClassName,
          "w-full bg-white outline-none text-gray-800 transition duration-100 ease-in-out border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary",

          props.rounded === "none" && "rounded-none",
          props.rounded === "sm" && "rounded-sm",
          props.rounded === "md" && "rounded-md",
          props.rounded === "lg" && "rounded-lg",
          props.rounded === "xl" && "rounded-xl",
          props.rounded === "2xl" && "rounded-2xl",
          props.rounded === "3xl" && "rounded-3xl",
          props.rounded === "full" && "rounded-full",

          props.size === "small" && "py-1.5 px-3 text-sm",
          props.size === "medium" && "py-2 px-4 text-sm",
          props.size === "large" && "py-2 px-4 text-base",

          props.placeholderColor === "light" && "placeholder-gray-400",
          props.placeholderColor === "medium" && "placeholder-gray-500",
          props.placeholderColor === "dark" && "placeholder-gray-600",
        )}
        value={props.value}
        onChange={props.onChange}
        {...props.register}
      />

      {props.icon}
      {props.type === "password" && (
        <button
          type="button"
          style={{ transform: "translateY(-50%)" }}
          className={styles.Eye}
          onClick={handleTogglePassword}
        >
          {showPassword ? <Icon name="eye" size={16} stroke="gray" /> : <Icon name="eye-off" size={16} stroke="gray" />}
        </button>
      )}
    </div>
  )
}

export default Input
