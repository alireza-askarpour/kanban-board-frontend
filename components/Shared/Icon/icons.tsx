import Add from "components/Shared/Icon/Icons/Add"
import Eye from "components/Shared/Icon/Icons/Eye"
import EyeSlash from "components/Shared/Icon/Icons/EyeSlash"
import Folder from "components/Shared/Icon/Icons/Folder"
import Login from "components/Shared/Icon/Icons/Login"
import Logout from "components/Shared/Icon/Icons/Logout"
import SettingsIcon from "components/Shared/Icon/Icons/Setting"

export const icons = {
  "eye-slash": EyeSlash,
  add: Add,
  eye: Eye,
  folder: Folder,
  login: Login,
  logout: Logout,
  settings: SettingsIcon,
}

export type IconName = keyof typeof icons
