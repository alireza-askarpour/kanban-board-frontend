import { useEffect } from "react"
import { useRouter } from "next/router"

import { useAccount } from "providers/Account/AccountProvider"
import { authUtils } from "utils"
import Sidebar from "./Sidebar"

const MainLayout = ({ children }) => {
  const router = useRouter()
  const { handleSetUser } = useAccount()

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated()
      if (!user) {
        router.push("/login")
      } else {
        handleSetUser(user)
      }
    }
    checkAuth()
  }, [])

  return (
    <div>
      <Sidebar />
      <div className="max-h-screen overflow-y-auto ml-64 flex-1">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
