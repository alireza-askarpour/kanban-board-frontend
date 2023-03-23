import Plus from "components/Shared/Icon/Icons/Plus"
import Eye from "components/Shared/Icon/Icons/Eye"
import EyeOff from "components/Shared/Icon/Icons/EyeOff"
import Folder from "components/Shared/Icon/Icons/Folder"
import Login from "components/Shared/Icon/Icons/Login"
import Logout from "components/Shared/Icon/Icons/Logout"
import SettingsIcon from "components/Shared/Icon/Icons/Setting"
import Mail from "./Icons/Mail"
import User from "./Icons/User"
import Lock from "./Icons/Lock"
import Clock from "./Icons/Clock"
import Star from "./Icons/Star"
import Trash from "./Icons/Trash"
import Menu from "./Icons/Menu"
import FileText from "./Icons/FileText"
import ChevronRight from "./Icons/ChevronRight"
import Search from "./Icons/Search"
import MoreHorizontal from "./Icons/MoreHorizontal"
import MessageSquare from "./Icons/MessageSquare"

export const icons = {
  "eye-off": EyeOff,
  "file-text": FileText,
  "chevron-right": ChevronRight,
  "more-horizontal": MoreHorizontal,
  "message-square": MessageSquare,
  plus: Plus,
  eye: Eye,
  mail: Mail,
  folder: Folder,
  login: Login,
  logout: Logout,
  settings: SettingsIcon,
  user: User,
  lock: Lock,
  clock: Clock,
  star: Star,
  trash: Trash,
  menu: Menu,
  search: Search,
}

export type IconName = keyof typeof icons
