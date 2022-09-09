import type { AppProps } from "next/app"

import { AccountProvider } from "providers/Account/AccountProvider"
import { BoardProvider } from "providers/Board/BoardProvider"
import { FavouriteProvider } from "providers/Favourite/FavouriteProvider"

import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <BoardProvider>
        <FavouriteProvider>
          <Component {...pageProps} />
        </FavouriteProvider>
      </BoardProvider>
    </AccountProvider>
  )
}

export default MyApp
