import { useState, useEffect } from "react"
import Picker from "emoji-picker-react"
import { classNames } from "utils"

const EmojiPicker = ({ icon, onChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("")
  const [isShowPicker, setIsShowPicker] = useState(false)

  useEffect(() => {
    setSelectedEmoji(icon)
  }, [icon])

  const handleSelectEmoji = (e: any, emojiObject: any) => {
    setIsShowPicker(false)
    onChange(emojiObject.emoji)
  }

  const handleShowPicker = () => setIsShowPicker(!isShowPicker)

  return (
    <div className="relative w-max">
      <button className="text-5xl cursor-pointer" onClick={handleShowPicker}>
        {selectedEmoji}
      </button>
      <div className={classNames("absolute top-full z-10", isShowPicker ? "block" : "hidden")}>
        <Picker onEmojiClick={handleSelectEmoji} />
      </div>
    </div>
  )
}

export default EmojiPicker
