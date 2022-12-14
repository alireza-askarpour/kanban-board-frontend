import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

import * as boardServices from "services/board.service"
import { useBoard } from "providers/Board/BoardProvider"
import { useAccount } from "providers/Account/AccountProvider"
import { useFavourite } from "providers/Favourite/FavouriteProvider"

import Icon from "components/Shared/Icon/Icon"
import SidebarItems from "./SidebarItems"
import { classNames } from "utils"

type IProps = {
  sideDrawer?: boolean
}

const Sidebar = ({ sideDrawer }: IProps) => {
  const navigate = useNavigate()
  const { boardId } = useParams()
  const { user } = useAccount()
  const { boards, handleSetBoards } = useBoard()
  const { favourites, handleSetFavourites } = useFavourite()

  useEffect(() => {
    const getBoards = async () => {
      const res = await boardServices.getAllBoards()
      if (res.success) handleSetBoards(res.boards)
      else toast.error("There is a problem on the server side")
    }
    getBoards()
  }, [boards.length])

  useEffect(() => {
    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0]._id}`)
    }
  }, [boards.length, boardId])

  useEffect(() => {
    const getFavourites = async () => {
      const res = await boardServices.getFavouritesBoards()
      if (res.success) {
        handleSetFavourites(res.favourites)
      } else toast.error("There is a problem on the server side")
    }
    getFavourites()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleAddBoard = async () => {
    const res = await boardServices.createBoard()
    if (res.success) {
      const newList = [res.board, ...boards]
      handleSetBoards(newList)
      navigate(`/boards/${res.board._id}`)
    } else toast.error("There is a problem on the server side")
  }

  if (!user) return null

  return (
    <>
      <aside
        className={classNames(
          "w-64 h-screen py-5 bg-gray-100 overflow-y-auto",
          !sideDrawer && "fixed top-0 left-0 bottom-0 hidden lg:block",
        )}
      >
        {/* Sidebar heading */}
        <header className="flex items-center mb-5 px-3">
          <h5 className="font-medium ml-1.5 mr-1.5 text-gray-700 line-clamp-1 flex-1">{user?.username}</h5>
          <button className="cursor-pointer rounded-full ml-auto" onClick={handleLogout}>
            <Icon name="logout" size={22} color="gray" />
          </button>
        </header>
        {/* Favourites items */}
        {favourites.length > 0 && (
          <>
            <h4 className="px-3 text-[15px] text-gray-500 mb-2">Favourites</h4>
            <SidebarItems listItems={favourites} />
          </>
        )}
        <hr className="mt-3 mb-4" />
        {/* Board items */}
        <div className="px-3 flex items-center justify-between">
          <h4 className="text-[15px] text-gray-500 mb-2">Private</h4>
          <button className="cursor-pointer rounded-full" onClick={handleAddBoard}>
            <Icon name="add" color="gray" />
          </button>
        </div>
        <SidebarItems listItems={boards} />
      </aside>
      <Toaster position="top-right" />
    </>
  )
}

export default Sidebar
