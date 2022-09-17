import { ReactNode } from "react"
import { authRoutes } from "constants/routes"

import AuthLayout from "components/Layouts/AuthLayout"
import MainLayout from "components/Layouts/MainLayout"

const getLayout = (pathname: string, children: ReactNode): JSX.Element => {
  if (authRoutes.includes(pathname)) return <AuthLayout children={children} />
  else return <MainLayout children={children} />
}

export default getLayout
