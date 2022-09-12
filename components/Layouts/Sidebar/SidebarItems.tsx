import Link from "next/link"
import { useRouter } from "next/router"

import { classNames } from "utils"
import { IBoard } from "types/schemas/Board"

const SidebarItems = ({ listItems }: { listItems: IBoard[] }) => {
  const router = useRouter()

  return (
    <div className="px-3">
      {listItems.map((item: IBoard) => (
        <Link href={`/boards/${item._id}`} key={item._id}>
          <div
            className={classNames(
              "flex items-center px-2.5 py-1.5 rounded-md cursor-pointer",
              `/boards/${item._id}` === router.asPath ? "text-white bg-primary" : "text-gray-700 ",
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
