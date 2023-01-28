import { useState } from "react"
import { classNames } from "utils"
import SingleBoardItem from "./SingleBoardItem"
import InsideBoardItem from "./InsideBoardItem"
import { boardItems } from "constants/sidebar/boardItems"
import { IProps } from "types/components/BoardItems"

const BoardItems = ({ heading }: IProps) => {
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
        boardItems.map((item: any) => {
          return (
            !item.responseTo && (
              <div key={item._id}>
                <SingleBoardItem board={item} boardId={item._id} />
                <InsideBoardItem boards={boardItems} boardId={item._id} parentBoardId={item._id} />
              </div>
            )
          )
        })}
    </div>
  )
}

export default BoardItems
