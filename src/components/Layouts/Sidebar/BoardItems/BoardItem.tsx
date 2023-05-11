import { useParams } from "react-router-dom"

import { Icon } from "../../../../components/Shared"
import { classNames } from "../../../../utils"

interface IProps {
  boardId: string
  board: any
}

const BoardItem = ({ board, boardId }: IProps) => {
  const params = useParams()

  return (
    <div
      className={classNames(
        "group flex items-center px-3 py-1 mx-1 my-[1px] rounded-[4px] cursor-pointer transition-colors hover:bg-[#ebebea]",
        params.boardId === boardId && "bg-[#f1f1f0]",
      )}
    >
      <div className="grid place-items-center w-5 h-5 mr-1 rounded-[4px] transition-colors hover:bg-[#d3d3d3]">
        {board.icon ? <span className="text-[13px]">{board.icon}</span> : <Icon name="file-text" size={18} stroke="gray" />}
      </div>
      <span className="text-sm font-bold text-[#19171199] line-clamp-1">{board.title}</span>
      <div className="place-items-center w-5 h-5 rounded-[3px] transition-colors ml-auto hidden group-hover:grid hover:bg-[#d6d6d6]">
        <Icon name="more-horizontal" size={17} stroke="gray" />
      </div>
    </div>
  )
}

export default BoardItem
