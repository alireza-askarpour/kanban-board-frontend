import { useState } from "react"

import { IProps } from "types/components/Input"
import { classNames } from "utils/classNames"

import styles from "./Input.module.css"
import Icon from "../Icon/Icon"

export default function Input(props: IProps) {
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
        className={classNames(styles.Input, props.inputClassName)}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />

      {props.icon}
      {props.type === "password" && (
        <button
          type="button"
          style={{ transform: "translateY(-50%)" }}
          className={styles.Eye}
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <Icon name="eye" size={16} color="black" />
          ) : (
            <Icon name="eye-slash" size={16} color="black" />
          )}
        </button>
      )}
    </div>
  )
}
