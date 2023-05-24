import { classNames } from "../../../utils"
import { IProps } from "../../../types/components/Avatar"

const Avatar = ({ variant = "primary", size, children, src, alt, className, fontSize, rounded }: IProps) => {
  return (
    <div
      className={classNames(
        className,
        "grid place-content-center overflow-hidden",

        variant === "primary" && "bg-[#37352f17]",
        variant === "secondary" && "bg-white border border-[#37352f]",

        rounded === "none" && "rounded-none",
        rounded === "sm" && "rounded-sm",
        rounded === "md" && "rounded-md",
        rounded === "lg" && "rounded-lg",
        rounded === "xl" && "rounded-xl",
        rounded === "2xl" && "rounded-2xl",
        rounded === "3xl" && "rounded-3xl",
        rounded === "full" && "rounded-full",
      )}
      style={{
        width: size || "24px",
        height: size || "24px",
        fontSize: `${fontSize}px` || "16px",
      }}
    >
      {!src && children && (
        <span
          className={classNames(variant === "primary" && "text-gray-500", variant === "secondary" && "text-[#37352f]")}
        >
          {children}
        </span>
      )}
      {!children && <img className="w-6 h-6 object-cover" src={src} alt={alt} />}
    </div>
  )
}

export default Avatar
