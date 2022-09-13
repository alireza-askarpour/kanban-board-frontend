import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { authUtils } from "utils"
import AppLoadingView from "views/app/AppLoadingView"

const AuthLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated()
      if (!isAuth) setIsLoading(false)
      else router.push("/")
    }
    checkAuth()
  }, [])

  return isLoading ? <AppLoadingView /> : <div className="max-h-screen">{children}</div>
}

export default AuthLayout
