import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TextareaAutosize from "react-textarea-autosize"
import toast from "react-hot-toast"

import { setInputHeight } from "../utils"
import { useBoard } from "../providers/Board/BoardProvider"
import { useFavourite } from "../providers/Favourite/FavouriteProvider"
import * as boardService from "../services/board.service"

import { Icon, EmojiPicker, Helmet } from "../components/Shared"
import Kanban from "../views/boards/Kanban"
import SideDrawer from "../components/Layouts/SideDrawer"
import MainLayout from "../components/Layouts/MainLayout"
import Navbar from "../components/Layouts/Navbar"
import Cover from "../views/boards/Cover"

let timer: any
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
    <MainLayout>
      <Helmet title="board">
        <SideDrawer show={openSideDrawer} hideMenu={onCloseSideDrawer} />

        <Navbar
          isFavourite={isFavourite}
          onDeleteBoard={handleDeleteBoard}
          onOpenSideDrawer={onOpenSideDrawer}
          onAddFavourite={handleAddFavourite}
        />
        {/* Kanban Section */}
        <section className="mb-3 group">
          <Cover />
          <section className="px-4 sm:px-8 lg:px-14">
            <div className="mt-4 select-none flex transition duration-150 opacity-0 group-hover:opacity-100">
              <div role="button" className="transition hover:bg-[#EFEFEF] cursor-pointer px-2 py-1 rounded-md text-sm text-[#37352f80] flex items-center">
                <svg
                  fill="rgba(55, 53, 47, 0.35)"
                  className="addPageIcon"
                  display="block"
                  viewBox="0 0 14 14"
                  style={{
                    width: 14,
                    height: 14,
                    WebkitFlexShrink: "0",
                    MsFlexShrink: "0",
                    flexShrink: "0",
                    backfaceVisibility: "hidden",
                    marginRight: 6,
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 102.054 0 1.027 1.027 0 00-2.054 0zm5.557 1.027a1.027 1.027 0 110-2.054 1.027 1.027 0 010 2.054zm1.211 2.816a.77.77 0 00-.124-1.087.786.786 0 00-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 00-1.107-.135.786.786 0 00-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add icon
              </div>
              <div role="button" className="transition hover:bg-[#EFEFEF] cursor-pointer px-2 py-1 rounded-md text-sm text-[#37352f80] flex items-center">
                <svg
                  fill="rgba(55, 53, 47, 0.35)"
                  className="addPageCover"
                  display="block"
                  viewBox="0 0 14 14"
                  style={{
                    width: 14,
                    height: 14,
                    WebkitFlexShrink: "0",
                    MsFlexShrink: "0",
                    flexShrink: "0",
                    backfaceVisibility: "hidden",
                    marginRight: 6,
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2 0a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V2a2 2 0 00-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add cover
              </div>
              <div role="button" className="transition hover:bg-[#EFEFEF] cursor-pointer px-2 py-1 rounded-md text-sm text-[#37352f80] flex items-center">
                <svg
                  fill="rgba(55, 53, 47, 0.35)"
                  className="collectionDescriptionSmall"
                  display="block"
                  viewBox="0 0 14 14"
                  style={{
                    width: 14,
                    height: 14,
                    WebkitFlexShrink: "0",
                    MsFlexShrink: "0",
                    flexShrink: "0",
                    backfaceVisibility: "hidden",
                    marginRight: 6,
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4.667a1.167 1.167 0 110-2.334 1.167 1.167 0 010 2.334zM8 11a1 1 0 11-2 0V7a1 1 0 012 0v4zM7 0a7 7 0 100 14A7 7 0 007 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add description
              </div>
            </div>
            <div className="flex space-x-2 pb-1">
              <EmojiPicker icon={icon} onChange={handleIconChange} />
              <TextareaAutosize
                value={title}
                placeholder="Untitled"
                onChange={handleUpdateTitle}
                className="text-[32px] font-semibold text-[#37352f] outline-none resize-none  w-full"
              />
            </div>
            <TextareaAutosize
              value={description}
              className="text-[#37352f] overflow-hidden w-full resize-none mb-4 text-sm outline-none h-[60px] placeholder:text-[#37352f80]"
              placeholder="Add a description..."
              onChange={handleUpdateDescription}
            />
          </section>
        </section>

        <Kanban data={sections} boardId={boardId} />
      </Helmet>
    </MainLayout>
  )
}

export default Board
