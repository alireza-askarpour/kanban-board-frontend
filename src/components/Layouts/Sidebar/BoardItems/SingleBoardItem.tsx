import { useState } from "react"
import { Icon } from "components/Shared"

interface IProps {
  boardId: string
  board: any
}

const SingleBoardItem = ({ boardId, board }: IProps) => {
  const [onCreate, setOnCreate] = useState(false)

  return (
    <div className="group flex items-center pl-[5px] pr-2 py-1 mx-1 rounded-[4px] cursor-pointer transition-colors hover:bg-[#ebebea]">
      <div className="flex items-center">
        <div className="grid place-items-center w-4 h-5 rounded-[3px] transition-colors hover:bg-[#bebebe]">
          <Icon name="chevron-right" size={10} stroke="gray" />
        </div>
        <div className="grid place-items-center w-5 h-5 mr-1 rounded-[4px] transition-colors hover:bg-[#bebebe]">
          <Icon name="file-text" size={18} stroke="gray" />
        </div>
      </div>
      <span className="text-sm font-bold text-[#19171199] line-clamp-1">{board.title}</span>
      <div className="hidden items-center ml-auto group-hover:flex">
        <div className="grid place-items-center w-5 h-5 rounded-[3px] transition-colors ml-0.5 hover:bg-[#bebebe]">
          <Icon name="more-horizontal" size={17} stroke="gray" />
        </div>
        <div className="grid place-items-center w-5 h-5 mr-1 rounded-[4px] transition-colors hover:bg-[#bebebe]">
          <Icon name="plus" size={14} stroke="gray" />
        </div>
      </div>
    </div>
  )
}

export default SingleBoardItem
