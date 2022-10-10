import { useState, useEffect, useRef } from "react"
import { motion } from 'framer-motion'
import Picker from "emoji-picker-react"

import { useOnClickOutside } from "hooks"

const EmojiPicker = ({ icon, onChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("")
  const [open, setOpen] = useState(false)

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const ref = useRef(null)

  useOnClickOutside(ref, onClose)

  useEffect(() => {
    setSelectedEmoji(icon)
  }, [icon])

  const handleSelectEmoji = (e: any, emojiObject: any) => {
    onClose()
    onChange(emojiObject.emoji)
  }

  return (
    <div className="relative">
      <button
        className="text-5xl cursor-pointer"
        onClick={onOpen}
        style={{
          pointerEvents: open ? 'none' : 'auto',
        }}
      >
        {selectedEmoji}
      </button>

      <motion.div
        style={{
          boxShadow: '0 4px 24px 0 rgb(0 0 0 / 24%)',
        }}
        className="left-2 md:left-4 absolute z-20 mt-2 rounded-[4px] overflow-hidden"
        initial="hide"
        ref={ref}
        animate={open ? 'show' : 'hide'}
        transition={{ duration: 0.25, type: 'tween' }}
        variants={{
          show: { opacity: 1, display: 'flex', flexDirection: 'column', y: 13 },
          hide: {
            opacity: 0,
            y: 26,
            flexDirection: 'column',
            transitionEnd: { display: 'none' },
          },
        }}
      >
       <Picker onEmojiClick={handleSelectEmoji} />
      </motion.div>
    </div>

  )
}

export default EmojiPicker
