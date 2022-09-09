import type { AppProps } from "next/app"

import { AccountProvider } from "providers/Account/AccountProvider"
import { BoardProvider } from "providers/Board/BoardProvider"

import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <BoardProvider>
        <Component {...pageProps} />
      </BoardProvider>
    </AccountProvider>
  )
}

export default MyApp
