import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAccount } from "../../providers/Account/AccountProvider"
import { authUtils } from "../../utils"

import Sidebar from "./Sidebar"
import AppLoadingView from "../../views/app/AppLoadingView"

const MainLayout = ({ children }: any) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const { handleSetUser } = useAccount()

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated()
      if (!user) {
        navigate("/login")
      } else {
        handleSetUser(user)
        setLoading(false)
      }
    }
    checkAuth()
  }, [navigate])

  return loading ? (
    <AppLoadingView />
  ) : (
    <section className="flex">
      <Sidebar />
      <div className="max-h-screen overflow-y-auto flex-1">
        <div className="min-h-screen">{children}</div>
      </div>
    </section>
  )
}

export default MainLayout
