import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { BoardProvider } from "./providers/Board/BoardProvider"
import { AccountProvider } from "./providers/Account/AccountProvider"
import { FavouriteProvider } from "./providers/Favourite/FavouriteProvider"

import "./styles/index.css"
import { router } from "./routes/root"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AccountProvider>
      <BoardProvider>
        <FavouriteProvider>
          <RouterProvider router={router} />
        </FavouriteProvider>
      </BoardProvider>
    </AccountProvider>
  </React.StrictMode>,
)
