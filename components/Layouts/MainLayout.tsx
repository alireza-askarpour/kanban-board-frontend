import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { useAccount } from "providers/Account/AccountProvider"
import { authUtils } from "utils"
import Sidebar from "./Sidebar"

const MainLayout = ({ children }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const { handleSetUser } = useAccount()

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated()
      if (!user) {
        setLoading(false)
        router.push("/login")
      } else {
        setLoading(false)
        handleSetUser(user)
      }
    }
    checkAuth()
  }, [])

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Sidebar />
      <div className="max-h-screen overflow-y-auto ml-64 flex-1">
        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
