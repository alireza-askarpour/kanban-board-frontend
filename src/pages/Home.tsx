import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

import * as boardService from "services/board.service"
import { useBoard } from "providers/Board/BoardProvider"

import { Button, Helmet } from "components/Shared"

const Home = () => {
  const [loading, setLoading] = useState(false)

  const { handleSetBoards } = useBoard()
  const navigate = useNavigate()

  const handleCreateBoard = async () => {
    setLoading(true)
    const res = await boardService.createBoard()

    if (res.success) {
      setLoading(false)
      handleSetBoards([res.board])
      navigate(`/boards/${res.board._id}`)
    } else {
      setLoading(false)
      toast.error("There is a problem on the server side")
    }
  }

  return (
    <Helmet title="boards">
      <div className="h-screen grid place-items-center">
        <Button variant="outline-primary" loading={loading} onClick={handleCreateBoard}>
          Click here to create your first board
        </Button>
      </div>
      <Toaster position="top-right" />
    </Helmet>
  )
}

export default Home
