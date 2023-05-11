import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authUtils } from "../../utils"
import AppLoadingView from "../../views/app/AppLoadingView"

const AuthLayout = ({ children }: any) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated()
      if (!isAuth) setIsLoading(false)
      else navigate("/boards")
    }
    checkAuth()
  }, [navigate])

  return isLoading ? <AppLoadingView /> : <div className="max-h-screen">{children}</div>
}

export default AuthLayout
