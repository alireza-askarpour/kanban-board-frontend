import Plus from "./Icons/Plus"
import Eye from "./Icons/Eye"
import EyeOff from "./Icons/EyeOff"
import Folder from "./Icons/Folder"
import Login from "./Icons/Login"
import Logout from "./Icons/Logout"
import SettingsIcon from "./Icons/Setting"
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
