import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

import * as boardServices from "../../../services/board.service"
import { useBoard } from "../../../providers/Board/BoardProvider"
import { useAccount } from "../../../providers/Account/AccountProvider"
import { useFavourite } from "../../../providers/Favourite/FavouriteProvider"

import { classNames } from "../../../utils"
import BoardItems from "./BoardItems"
import SidebarItem from "./SidebarItem"
import Icon from "../../../components/Shared/Icon/Icon"
import ProfileDropdown from "./ProfileDropdown"

interface IProps {
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
          "w-64 h-screen select-none bg-[#fbfbfa] overflow-y-auto z-20",
          sideDrawer ? "flex flex-col" : "hidden lg:flex lg:flex-col",
        )}
      >
        {/* Sidebar heading */}
        <div className="w-64 bg-[#fbfbfa] border-r border-r-[#f5f5f4]">
          <ProfileDropdown />
          <div className="pb-2 border-b border-[#e9e9e7]">
            <SidebarItem title="Search" icon="search" />
            <SidebarItem title="Updates" icon="clock" />
            <SidebarItem title="Settings & members" icon="settings" />
          </div>
        </div>

        {/* Board items */}
        <div className="w-64 overflow-y-auto border-r border-[#f5f5f4]">
          <BoardItems boards={boards} heading="Favorites" />
          <BoardItems boards={boards} heading="Shared" />
          <BoardItems boards={boards} heading="Private" />
          <div className="pb-[18px] mt-[18px]">
            <SidebarItem title="Trash" icon="trash" />
          </div>
        </div>

        {/* Add new page button */}
        <div className="mt-auto flex items-center w-64 min-h-[45px] h-[45px] px-2.5 mb-[1px] bg-[#fbfbfa] border-t border-t-[#e9e9e7] border-r border-r-[#f5f5f4] transition-colors cursor-pointer hover:bg-[#ebebea]">
          <Icon name="plus" stroke="gray" size={22} />
          <span className="text-sm font-bold text-[#19171199] ml-2">New page</span>
        </div>
      </aside>
      <Toaster position="top-right" />
    </>
  )
}

export default Sidebar
