import type { AppProps } from "next/app"
import { AccountProvider } from "providers/Account/AccountProvider"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <Component {...pageProps} />
    </AccountProvider>
  )
}

export default MyApp
