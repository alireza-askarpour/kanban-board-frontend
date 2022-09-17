import { useRouter } from "next/router"
import { getLayout } from "utils"

const Layout = ({ children }) => {
  const { pathname } = useRouter()

  return <div>{getLayout(pathname, children)}</div>
}

export default Layout
