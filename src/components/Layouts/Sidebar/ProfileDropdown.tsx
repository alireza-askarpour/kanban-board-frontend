import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { useOnClickOutside } from "../../../hooks"
import { Button, Icon } from "../../../components/Shared"
import { useAccount } from "../../../providers/Account/AccountProvider"
import { classNames, getFirstCharacter } from "../../../utils"
import Avatar from "../../../components/Shared/Avatar/Avatar"

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const navigate = useNavigate()
  const { user } = useAccount()
  const ref = useRef(null)
  useOnClickOutside(ref, onClose)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="relative bg-green-300 z-30">
      <div
        onClick={onOpen}
        className={classNames(
          "w-full h-12 flex items-center px-3 cursor-pointer transition-colors bg-[#fbfbfa] hover:bg-[#ebebea]",
          open && "pointer-events-none",
        )}
      >
        <Avatar size={24} variant="primary" className="mr-2 rounded-[4px]">
          {getFirstCharacter("S")}
        </Avatar>
        <span className="font-bold mr-1.5 text-sm select-none text-gray-700 line-clamp-1 flex-1">
          {"Setup Application" || user?.username}
        </span>
        <div className="w-3 h-3">
          <svg
            viewBox="-1 -1 9 11"
            className="expand"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              fill: "#37352f73",
              flexShrink: 0,
              backfaceVisibility: "hidden",
            }}
          >
            <path
              id="path0_stroke"
              d="M 3.5 0L 3.98809 -0.569442L 3.5 -0.987808L 3.01191 -0.569442L 3.5 0ZM 3.5 9L 3.01191 9.56944L 3.5 9.98781L 3.98809 9.56944L 3.5 9ZM 0.488094 3.56944L 3.98809 0.569442L 3.01191 -0.569442L -0.488094 2.43056L 0.488094 3.56944ZM 3.01191 0.569442L 6.51191 3.56944L 7.48809 2.43056L 3.98809 -0.569442L 3.01191 0.569442ZM -0.488094 6.56944L 3.01191 9.56944L 3.98809 8.43056L 0.488094 5.43056L -0.488094 6.56944ZM 3.98809 9.56944L 7.48809 6.56944L 6.51191 5.43056L 3.01191 8.43056L 3.98809 9.56944Z"
            ></path>
          </svg>
        </div>
      </div>

      <motion.div
        className="fixed top-10 left-3 shadow overflow-hidden min-w-[250px] z-50 mt-2 rounded-[4px] select-none bg-white dark:bg-dark-gray700 dark:text-white"
        initial="hide"
        ref={ref}
        animate={open ? "show" : "hide"}
        transition={{ duration: 0.2, type: "tween" }}
        variants={{
          show: { opacity: 1, display: "flex", scale: 1 },
          hide: { opacity: 0, scale: 0.93, transitionEnd: { display: "none" } },
        }}
      >
        <div className="w-full">
          <header className="mt-1 mx-3">
            <small className="text-[#37352fa6] text-[11px]">askarpourdev@gmail.com</small>
          </header>

          <div className="pb-2.5 pt-1">
            <div className="flex px-3 py-2 cursor-pointer transition-colors hover:bg-[#ebebea]" onClick={onClose}>
              <Avatar size={35} variant="primary" className="mr-2 rounded-[4px]" fontSize={20}>
                {getFirstCharacter("S")}
              </Avatar>
              <div className="flex-1">
                <h5 className="text-sm line-clamp-1 text-[#37352f]">JuniorCoders Team</h5>
                <p className="text-xs text-[#37352fa6] line-clamp-1">Free Plan · 1 member</p>
              </div>
            </div>

            <div className="flex px-3 py-2 cursor-pointer transition-colors hover:bg-[#ebebea]" onClick={onClose}>
              <Avatar size={35} variant="primary" className="mr-2 rounded-[4px]" fontSize={20}>
                {getFirstCharacter("S")}
              </Avatar>
              <div>
                <h5 className="text-sm line-clamp-1 text-[#37352f]">Project</h5>
                <p className="text-xs text-[#37352fa6] line-clamp-1">Free Plan · 1 member</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="w-full flex flex-col items-start justify-center py-[6px] px-1">
            <button
              onClick={onClose}
              className="w-full text-left px-3 py-1.5 text-xs rounded-[4px] transition-colors text-[#37352fa6] hover:bg-[#ebebea]"
            >
              Add another account
            </button>
            <button
              onClick={onClose}
              className="w-full text-left px-3 py-1.5 text-xs rounded-[4px] transition-colors text-[#37352fa6] hover:bg-[#ebebea]"
            >
              Log out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfileDropdown
