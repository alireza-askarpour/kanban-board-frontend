import { Link } from "react-router-dom"
import { Icon } from "../../../components/Shared"
import { IProps } from "../../../types/components/SidebarItems"

const SidebarItems = ({ title, icon, href }: IProps) => {
  return href ? (
    <Link to={href}>
      <div className="flex items-center px-3 py-1 mx-1 rounded-[4px] cursor-pointer transition-colors hover:bg-[#ebebea]">
        <Icon name={icon} size={16} stroke="gray" className="mr-1" />
        <span className="text-sm font-bold text-[#19171199] ml-1">{title}</span>
      </div>
    </Link>
  ) : (
    <div className="flex items-center px-3 py-1 mx-1 rounded-[4px] cursor-pointer transition-colors hover:bg-[#ebebea]">
      <Icon name={icon} size={16} stroke="gray" className="mr-1" />
      <span className="text-sm font-bold text-[#19171199] ml-1">{title}</span>
    </div>
  )
}

export default SidebarItems
