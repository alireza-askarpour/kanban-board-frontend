import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Picker from "emoji-picker-react"

import { useOnClickOutside } from "../../../hooks"
import { classNames } from "../../../utils"

interface Props {
  open: boolean
  icon: string
  className: string
  setOpen: any
  onChange: (icon: string) => void
}

const EmojiPicker = ({ icon, open, setOpen, onChange, className }: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState("")

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const ref = useRef(null)

  useOnClickOutside(ref, onClose)

  useEffect(() => {
    setSelectedEmoji(icon)
  }, [icon])

  const handleSelectEmoji = (e: any) => {
    onChange(e.emoji)
    onClose()
  }

  return (
    <div className="relative grid place-items-center">
      <button
        className={classNames("text-3xl cursor-pointer", className)}
        onClick={onOpen}
        style={{
          pointerEvents: open ? "none" : "auto",
        }}
      >
        {selectedEmoji}
      </button>

      <motion.div
        style={{
          boxShadow: "0 4px 24px 0 rgb(0 0 0 / 24%)",
        }}
        className="left-2 md:left-4 absolute z-20 mt-2 rounded-[4px] overflow-hidden"
        initial="hide"
        ref={ref}
        animate={open ? "show" : "hide"}
        transition={{ duration: 0.25, type: "tween" }}
        variants={{
          show: { opacity: 1, display: "flex", flexDirection: "column", y: 13 },
          hide: {
            opacity: 0,
            y: 26,
            flexDirection: "column",
            transitionEnd: { display: "none" },
          },
        }}
      >
        <Picker onEmojiClick={handleSelectEmoji} />
      </motion.div>
    </div>
  )
}

export default EmojiPicker
