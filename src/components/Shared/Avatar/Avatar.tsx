import { classNames } from "../../../utils"
import { IProps } from "../../../types/components/Avatar"

const Avatar = ({ variant, size, children, src, alt, className, fontSize }: IProps) => {
  return (
    <div
      className={classNames(
        "bg-[#37352f17] grid place-content-center overflow-hidden",
        variant === "circle" && "rounded-full",
        variant === "square" && "rounded-[4px]",
        className
      )}
      style={{
        width: size || "24px",
        height: size || "24px",
        fontSize: `${fontSize}px` || "16px"
      }}
    >
      {!src && children && <span className="text-gray-500">{children}</span>}
      {!children && <img className="w-6 h-6 object-cover" src={src} alt={alt} />}
    </div>
  )
}

export default Avatar
