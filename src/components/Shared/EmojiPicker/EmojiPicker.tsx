import { useState, useEffect } from "react"
import { classNames } from "utils"

const EmojiPicker = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("⬇️")
  const [isShowPicker, setIsShowPicker] = useState(false)

  // useEffect(() => {
  // //   setSelectedEmoji(icon)
  // // }, [icon])

  const handleSelectEmoji = (e: any) => {
    // const sym = e.unified.split("-")
    // let codesArray = []
    // sym.forEach((el: any) => codesArray.push("0x" + el))
    // const emoji = String.fromCodePoint(...codesArray)
    // setIsShowPicker(false)
    // onChange(emoji)
  }

  const handleShowPicker = () => setIsShowPicker(!isShowPicker)

  const [chosenEmoji, setChosenEmoji] = useState(null)

  // const onEmojiClick = (event, emojiObject) => {
  //   setChosenEmoji(emojiObject)
  // }

  return (
    <div className="relative w-max">
      <button className="text-5xl cursor-pointer" onClick={handleShowPicker}>
        {selectedEmoji}
      </button>
      <div className={classNames("absolute top-full z-10", isShowPicker ? "block" : "hidden")}>Alireza</div>
    </div>
  )
}

export default EmojiPicker
