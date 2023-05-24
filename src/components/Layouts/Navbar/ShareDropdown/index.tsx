import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { useOnClickOutside } from "../../../../hooks"
import { Button, Icon, Input } from "../../../../components/Shared"
import { classNames, getFirstCharacter } from "../../../../utils"
import Avatar from "../../../../components/Shared/Avatar/Avatar"

const ShareDropdown = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  
  const onClose = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  const navigate = useNavigate()
  const ref = useRef(null)
  useOnClickOutside(ref, onClose)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="relative z-50">
      <button
        onClick={onOpen}
        className={classNames(
          "h-7 font-extrabold text-sm leading-7 px-2 cursor-pointer select-none transition hover:bg-[#EFEFEF] rounded-[4px]",
          open && "pointer-events-none",
        )}
      >
        Share
      </button>

      <motion.div
        className="absolute top-7 right-0 overflow-hidden min-w-[460px] z-50 mt-2 rounded-[4px] select-none bg-white dark:bg-dark-gray700 dark:text-white"
        style={{
          boxShadow:
            "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px",
        }}
        initial="hide"
        ref={ref}
        animate={open ? "show" : "hide"}
        transition={{ duration: 0.2, type: "tween" }}
        variants={{
          show: { opacity: 1, display: "flex", translateY: 0 },
          hide: { opacity: 0, translateY: 20, transitionEnd: { display: "none" } },
        }}
      >
        <div className="w-full">
          <header className="py-2 px-3.5 mb-1">
            <small className="text-[#37352f] font-extrabold text-sm">Share</small>
            <form>
              <div className="flex items-center space-x-1.5 mt-1.5">
                <Input
                  name=""
                  placeholder="Add people"
                  placeholderColor="light"
                  size="small"
                  className="flex-1"
                  inputClassName="bg-[#F7F7F5] focus:bg-white"
                  rounded="md"
                />
                <Button size="small">Invite</Button>
              </div>
            </form>
          </header>

          <div className="flex items-center mx-3.5 bg-[#F1F1EF] py-1.5 rounded-[4px] mb-3">
            <Avatar size={20} variant="secondary" className="mr-2 ml-3.5" fontSize={10} rounded="full">
              {getFirstCharacter("A")}
            </Avatar>
            <span className="text-xs text-[#37352f]">You have full access to this page</span>
          </div>

          <h5 className="mx-3.5 text-[#37352fa6] text-xs font-extrabold">People with access</h5>
          <div className="pb-2.5 pt-1">
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer transition-colors hover:bg-[#ebebea]"
              onClick={onClose}
            >
              <div className="flex">
                <Avatar size={32} variant="secondary" className="mr-2" fontSize={14} rounded="full">
                  {getFirstCharacter("S")}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h5 className="text-sm line-clamp-1 text-[#37352f]">Alireza</h5>
                    <p className="text-[9px] ml-1.5 inline-block px-1.5 rounded-[3px] text-[#cf8807] bg-[#ffefc4]">
                      Owner
                    </p>
                  </div>
                  <p className="text-xs text-[#37352fa6] -mt-1 line-clamp-1">alirezaaskarpour@gmail.com</p>
                </div>
              </div>
              <div className="transition-all text-xs px-2 py-1 rounded-[3px] text-[#37352fa6] hover:bg-[#88857d29] active:bg-[#3b3a3629]">
                <span>Full access</span>
              </div>
            </div>

            <div className="flex px-3 py-2 cursor-pointer transition-colors hover:bg-[#ebebea]" onClick={onClose}>
              <Avatar size={32} variant="secondary" className="mr-2" fontSize={14} rounded="full">
                {getFirstCharacter("S")}
              </Avatar>
              <div>
                <h5 className="text-sm line-clamp-1 text-[#37352f]">Project</h5>
                <p className="text-xs text-[#37352fa6] -mt-1 line-clamp-1">alirezaaskarpour@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ShareDropdown
