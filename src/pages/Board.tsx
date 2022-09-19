import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

import { setInputHeight } from "utils"
import { useBoard } from "providers/Board/BoardProvider"
import { useFavourite } from "providers/Favourite/FavouriteProvider"
import * as boardService from "services/board.service"

import { Icon, EmojiPicker, Helmet } from "components/Shared"
import Kanban from "views/boards/Kanban"
import SideDrawer from "components/Layouts/SideDrawer"
import Sidebar from "components/Layouts/Sidebar"

let timer
let timeout = 500

const Board = () => {
  const navigate = useNavigate()
  const { boardId } = useParams()

  const { boards, handleSetBoards } = useBoard()
  const { favourites, handleSetFavourites } = useFavourite()

  const [icon, setIcon] = useState("")
  const [isFavourite, setIsFavourite] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [sections, setSections] = useState([])
  const [openSideDrawer, setOpenSideDrawer] = useState(false)

  const onOpenSideDrawer = () => setOpenSideDrawer(true)
  const onCloseSideDrawer = () => setOpenSideDrawer(false)

  const handleIconChange = async (newIcon: string) => {
    let temp = [...boards]
    const index = temp.findIndex((e) => e._id === boardId)
    temp[index] = { ...temp[index], icon: newIcon }

    if (isFavourite) {
      let tempFavourite = [...favourites]
      const favouriteIndex = tempFavourite.findIndex((e) => e._id === boardId)
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], icon: newIcon }
      handleSetFavourites(tempFavourite)
    }

    setIcon(newIcon)
    handleSetBoards(temp)

    const res = await boardService.updateBoard(boardId, { icon: newIcon })
    if (!res.success) toast.error("There is a problem on the server side")
  }

  const handleUpdateTitle = async (e: ChangeEvent<HTMLInputElement>) => {
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
    setInputHeight(e, "60px")
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
      }
    }
    getBoards()

    return () => clearTimeout(timer)
  }, [boardId])

  return (
    <Helmet title="board">
      {/* Side Drawer */}
      <SideDrawer show={openSideDrawer} hideMenu={onCloseSideDrawer} />
      {/* Navbar Items */}
      <header className="flex items-center px-2 py-3">
        <button
          className="rounded-full p-2 transition hover:bg-gray-100 active:bg-gray-200 lg:hidden"
          onClick={onOpenSideDrawer}
        >
          <Icon name="menu" color="gray" />
        </button>
        <button
          className="rounded-full p-2 transition hover:bg-gray-100 active:bg-gray-200"
          onClick={handleAddFavourite}
        >
          <Icon
            name="star"
            size={22}
            variant={isFavourite ? "bold" : "outline"}
            color={isFavourite ? "orange" : "gray"}
          />
        </button>
        <button
          className="rounded-full p-2 transition hover:bg-red-100 active:bg-red-200 ml-auto"
          onClick={handleDeleteBoard}
        >
          <Icon name="trash" color="red" size={22} />
        </button>
      </header>
      {/* Kanban Section */}
      <section className="px-4 sm:px-8 lg:px-14 py-3">
        <section>
          <div>
            {/* emoji picker */}
            <EmojiPicker icon={icon} onChange={handleIconChange} />
            <input
              value={title}
              placeholder="Untitled"
              onChange={handleUpdateTitle}
              className="text-3xl font-bold text-gray-800 outline-none py-4 w-full"
            />
            <textarea
              value={description}
              placeholder="Add a description"
              className="text-gray-800 overflow-hidden w-full resize-none px-4 mb-4 text-sm outline-none h-[60px]"
              onChange={handleUpdateDescription}
            ></textarea>
          </div>
        </section>
        <Kanban data={sections} boardId={boardId} />
      </section>
    </Helmet>
  )
}

export default Board
