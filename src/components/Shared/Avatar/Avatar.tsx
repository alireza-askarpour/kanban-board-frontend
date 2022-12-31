import { classNames } from "utils"
import { IProps } from "types/components/Avatar"

const Avatar = ({ variant, size, children, src, alt }: IProps) => {
  return (
    <div
      className={classNames(
        "bg-gray-200 text-base grid place-content-center overflow-hidden",
        variant === "circle" && "rounded-full",
        variant === "square" && "rounded-[4px]",
      )}
      style={{
        width: size || "24px",
        height: size || "24px",
      }}
    >
      {!src && children && <span className="text-gray-600">{children}</span>}
      {!children && <img className="w-6 h-6 object-cover" src={src} alt={alt} />}
    </div>
  )
}

export default Avatar
