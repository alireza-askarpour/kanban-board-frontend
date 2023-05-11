import { Icon } from "../../Shared"

interface Props {
  isFavourite: boolean
  onOpenSideDrawer: () => void
  onDeleteBoard: () => void
  onAddFavourite: () => void
}

const Navbar = ({ isFavourite, onOpenSideDrawer, onDeleteBoard, onAddFavourite }: Props) => {
  return (
    <header>
      <nav className="flex items-center justify-between px-2 py-3 text-[#37352f] h-11 border-b">
        {/* <button
        className="rounded-full p-2 transition hover:bg-gray-100 active:bg-gray-200 lg:hidden"
        onClick={onOpenSideDrawer}
      >
        <Icon name="menu" stroke="gray" />
      </button> */}

        <div className="h-6 grid place-items-center cursor-pointer select-none transition hover:bg-[#EFEFEF] rounded-[4px]">
          <span className="px-1.5 text-sm leading-[17px] pb-1 pt-0.5">Daily Routing</span>
        </div>

        <div className="flex items-center">
          <button className="h-7 font-bold text-sm leading-7 px-2 cursor-pointer select-none transition hover:bg-[#EFEFEF] rounded-[4px]">
            Share
          </button>
          <button
            className="h-7 w-[33px] grid place-items-center cursor-pointer transition hover:bg-[#EFEFEF] rounded-[4px]"
            onClick={onAddFavourite}
          >
            <Icon name="clock" size={18} />
          </button>
          <button className="h-7 w-[33px] grid place-items-center cursor-pointer transition hover:bg-[#EFEFEF] rounded-[4px]">
            <Icon name="star" size={18} />
          </button>
          <button className="h-7 w-[33px] grid place-items-center cursor-pointer transition hover:bg-[#EFEFEF] rounded-[4px]">
            <Icon name="more-horizontal" size={22} />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
