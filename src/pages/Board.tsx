import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

import { useBoard } from "../providers/Board/BoardProvider"
import { useFavourite } from "../providers/Favourite/FavouriteProvider"
import * as boardService from "../services/board.service"

import { Helmet } from "../components/Shared"
import Kanban from "../views/boards/Kanban"
import SideDrawer from "../components/Layouts/SideDrawer"
import MainLayout from "../components/Layouts/MainLayout"
import Navbar from "../components/Layouts/Navbar"
import Heading from "../views/boards/Heading"

let timer: any
let timeout = 500

const Board = () => {
  const navigate = useNavigate()
  const { boardId } = useParams()

  const { boards, handleSetBoards } = useBoard()
  const { favourites, handleSetFavourites } = useFavourite()

  const [icon, setIcon] = useState("")
  const [cover, setCover] = useState("")
  const [isFavourite, setIsFavourite] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [sections, setSections] = useState([])
  const [openSideDrawer, setOpenSideDrawer] = useState(false)

  const onOpenSideDrawer = () => setOpenSideDrawer(true)
  const onCloseSideDrawer = () => setOpenSideDrawer(false)

  const handleIconChange = async (newIcon: string) => {
    let temp: any = [...boards]
    const index = temp.findIndex((e: any) => e._id === boardId)
    temp[index] = { ...temp[index], icon: newIcon }

    if (isFavourite) {
      let tempFavourite: any = [...favourites]
      const favouriteIndex = tempFavourite.findIndex((e: any) => e._id === boardId)
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], icon: newIcon }
      handleSetFavourites(tempFavourite)
    }

    setIcon(newIcon)
    handleSetBoards(temp)

    const res = await boardService.updateBoard(boardId, { icon: newIcon })
    if (!res.success) toast.error("There is a problem on the server side")
  }

  const handleUpdateTitle = async (e: any) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

    let temp = [...boards]
    const index = temp.findIndex((e) => e._id === boardId)

    temp[index] = { ...temp[index], title: newTitle }

    if (isFavourite) {
      let tempFavourite = [...favourites]
      const favouriteIndex = tempFavourite.findIndex((e) => e._id === boardId)
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], title: newTitle }
      handleSetFavourites(tempFavourite)
    }

    handleSetBoards(temp)

    timer = setTimeout(async () => {
      const res = await boardService.updateBoard(boardId, { title: newTitle })
      if (res.error) {
        toast.error("There is a problem on the server side")
      }
    }, timeout)
  }

  const handleUpdateDescription = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)
    timer = setTimeout(async () => {
      const res = await boardService.updateBoard(boardId, { description: newDescription })
      if (res.error) toast.error("There is a problem on the server side")
    }, timeout)
  }

  const handleAddFavourite = async () => {
    const res = await boardService.updateBoard(boardId, { favourite: !isFavourite })
    if (res.success) {
      let newFavouriteList = [...favourites]
      if (isFavourite) newFavouriteList = newFavouriteList.filter((e) => e._id !== boardId)
      else newFavouriteList.unshift(res.board)
      handleSetFavourites(newFavouriteList)
      setIsFavourite(!isFavourite)
    } else toast.error("There is a problem on the server side")
  }

  const handleDeleteBoard = async () => {
    const res = await boardService.deleteBoard(boardId)
    if (res.error) toast.error("There is a problem on the server side")

    if (isFavourite) {
      const newFavourites = favourites.filter((e) => e._id !== boardId)
      handleSetFavourites(newFavourites)
    }

    const newList = boards.filter((e) => e._id !== boardId)
    if (newList.length === 0) navigate("/boards")
    else navigate(`/boards/${newList[0]._id}`)
    handleSetBoards(newList)
  }

  useEffect(() => {
    const getBoards = async () => {
      const res = await boardService.getOneBoard(boardId)
      if (res.success) {
        setTitle(res.board.title)
        setDescription(res.board.description)
        setSections(res.board.sections)
        setIsFavourite(res.board.favourite)
        setIcon(res.board.icon)
        setCover(res.board.cover)
      }
    }
    getBoards()

    return () => clearTimeout(timer)
  }, [boardId])

  return (
    <MainLayout>
      <Helmet title="board">
        <SideDrawer show={openSideDrawer} hideMenu={onCloseSideDrawer} />

        <Navbar
          isFavourite={isFavourite}
          onDeleteBoard={handleDeleteBoard}
          onOpenSideDrawer={onOpenSideDrawer}
          onAddFavourite={handleAddFavourite}
        />
        <Heading
          cover={cover}
          title={title}
          description={description}
          icon={icon}
          handleUpdateTitle={handleUpdateTitle}
          handleIconChange={handleIconChange}
          handleUpdateDescription={handleUpdateDescription}
        />
        <Kanban data={sections} boardId={boardId} />
      </Helmet>
    </MainLayout>
  )
}

export default Board
