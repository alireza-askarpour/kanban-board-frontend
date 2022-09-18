import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { AccountProvider } from "providers/Account/AccountProvider"
import { BoardProvider } from "providers/Board/BoardProvider"
import { FavouriteProvider } from "providers/Favourite/FavouriteProvider"

import "./styles/index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <AccountProvider>
      <BoardProvider>
        <FavouriteProvider>
          <App />
        </FavouriteProvider>
      </BoardProvider>
    </AccountProvider>
  </React.StrictMode>,
)
