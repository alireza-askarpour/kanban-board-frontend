import { createBrowserRouter } from "react-router-dom"

import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import Board from "../pages/Board"

export const router = createBrowserRouter([
  { path: "/", element: <div>home page</div> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/boards", element: <Home /> },
  { path: "/boards/:boardId", element: <Board /> },
])
