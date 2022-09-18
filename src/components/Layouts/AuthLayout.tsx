import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { authUtils } from "utils"
import AppLoadingView from "views/app/AppLoadingView"

const AuthLayout = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated()
      if (!isAuth) setIsLoading(false)
      else navigate("/")
    }
    checkAuth()
  }, [navigate])

  return isLoading ? (
    <AppLoadingView />
  ) : (
    <div className="max-h-screen">
      <Outlet />
    </div>
  )
}

export default AuthLayout
