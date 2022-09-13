import { useState } from "react"
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast"

import * as boardService from "services/board.service"
import { useBoard } from "providers/Board/BoardProvider"

import Layout from "components/Layouts/Layout"
import Button from "components/Shared/Button/Button"

const Home = () => {
  const [loading, setLoading] = useState(false)

  const { handleSetBoards } = useBoard()
  const router = useRouter()

  const handleCreateBoard = async () => {
    setLoading(true)
    const res = await boardService.createBoard()

    if (res.success) {
      setLoading(false)
      handleSetBoards([res.board])
      router.push(`/boards/${res.board._id}`)
    } else {
      setLoading(false)
      toast.error("There is a problem on the server side")
    }
  }

  return (
    <Layout>
      <>
        <div className="h-screen grid place-items-center">
          <Button variant="outline-primary" loading={loading} onClick={handleCreateBoard}>
            Click here to create your first board
          </Button>
        </div>
        <Toaster position="top-right" />
      </>
    </Layout>
  )
}

export default Home
