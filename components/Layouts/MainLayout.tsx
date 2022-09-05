import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAccount } from "providers/Account/AccountProvider"
import { authUtils } from "utils"

const MainLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const { handleSetUser } = useAccount()

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated()
      if (!user) {
        router.push("/login")
      } else {
        handleSetUser(user)
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  return isLoading ? <div>Loading...</div> : <div>{children}</div>
}

export default MainLayout
