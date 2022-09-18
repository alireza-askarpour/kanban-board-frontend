import { Link, useLocation } from "react-router-dom"

import { classNames } from "utils"
import { IBoard } from "types/schemas/Board"

const SidebarItems = ({ listItems }: { listItems: IBoard[] }) => {
  const { pathname } = useLocation()

  return (
    <div className="px-3">
      {listItems.map((item: IBoard) => (
        <Link to={`/boards/${item._id}`} key={item._id}>
          <div
            className={classNames(
              "flex items-center px-2.5 py-1.5 rounded-md cursor-pointer",
              `/boards/${item._id}` === pathname ? "text-white bg-primary" : "text-gray-700 ",
            )}
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-[15px] ml-2 line-clamp-1">{item.title}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SidebarItems
