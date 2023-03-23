import { useState } from "react"
import { Link } from "react-router-dom"

import BoardItem from "./BoardItem"

import { classNames } from "utils"
import { IProps } from "types/components/BoardItems"

const BoardItems = ({ heading, boards }: IProps) => {
  const [hideItems, setHideItems] = useState(false)

  const toggleHideItems = () => setHideItems(!hideItems)

  return (
    <div className={classNames(!hideItems && "mb-[18px]")}>
      <div className="px-[10px] mt-1.5 mb-0.5">
        <span
          onClick={toggleHideItems}
          className="text-[#37352f80] px-[5px] rounded-[3px] text-xs font-bold transition-colors hover:bg-[#ebebea] cursor-pointer"
        >
          {heading}
        </span>
      </div>
      {!hideItems &&
        boards.map((item: any) => {
          return (
            <Link to={`/boards/${item._id}`} key={item._id}>
              <BoardItem board={item} boardId={item._id} />
            </Link>
          )
        })}
    </div>
  )
}

export default BoardItems
