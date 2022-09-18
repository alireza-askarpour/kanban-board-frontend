import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "components/Layouts/AuthLayout"
import MainLayout from "components/Layouts/MainLayout"
import Login from "pages/Login"
import Signup from "pages/Signup"
import Home from "pages/Home"
import Board from "pages/Board"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="boards" element={<Home />} />
          <Route path="boards/:boardId" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
