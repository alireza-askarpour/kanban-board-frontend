import Add from "components/Shared/Icon/Icons/Add"
import Eye from "components/Shared/Icon/Icons/Eye"
import EyeSlash from "components/Shared/Icon/Icons/EyeSlash"
import Folder from "components/Shared/Icon/Icons/Folder"
import Login from "components/Shared/Icon/Icons/Login"
import Logout from "components/Shared/Icon/Icons/Logout"
import SettingsIcon from "components/Shared/Icon/Icons/Setting"
import Sms from "./Icons/Sms"
import User from "./Icons/User"
import Lock from "./Icons/Lock"
import Clock from "./Icons/Clock"
import Star from "./Icons/Star"
import Trash from "./Icons/Trash"
import Menu from "./Icons/Menu"

export const icons = {
  "eye-slash": EyeSlash,
  add: Add,
  eye: Eye,
  sms: Sms,
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
}

export type IconName = keyof typeof icons
