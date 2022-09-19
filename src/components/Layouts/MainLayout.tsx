import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { useAccount } from "providers/Account/AccountProvider"
import { authUtils } from "utils"

import Sidebar from "./Sidebar"
import AppLoadingView from "views/app/AppLoadingView"

const MainLayout = () => {
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
    <div>
      <Sidebar />
      <div className="max-h-screen overflow-y-auto lg:ml-64 flex-1">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
