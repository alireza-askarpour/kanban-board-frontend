import { ChangeEvent, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"

import Cover from "./Cover"
import { EmojiPicker } from "../../../components/Shared"

import { classNames } from "../../../utils"

interface Props {
  cover: string
  icon: string
  title: string
  description: string
  handleUpdateTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleIconChange: (icon: string) => void
  handleUpdateDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const Heading = ({
  title,
  description,
  icon,
  cover,
  handleUpdateTitle,
  handleIconChange,
  handleUpdateDescription,
}: Props) => {
  const [showDescription, setShowDescription] = useState(false)
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

  return (
    <section className="mb-3 group">
      {cover && <Cover src={cover} />}
      <section className="px-4 sm:px-8 lg:px-14">
        <div className="mt-4 select-none flex transition duration-150 opacity-0 group-hover:opacity-100">
          {!icon && (
            <div
              role="button"
              className={classNames(
                "transition hover:bg-[#EFEFEF] cursor-pointer px-2 py-1 rounded-md text-sm text-[#37352f80] flex items-center",
              )}
              onClick={() => setOpenEmojiPicker(true)}
            >
              <svg
                fill="rgba(55, 53, 47, 0.35)"
                className="addPageIcon"
                display="block"
                viewBox="0 0 14 14"
                style={{
                  width: 14,
                  height: 14,
                  WebkitFlexShrink: "0",
                  MsFlexShrink: "0",
                  flexShrink: "0",
                  backfaceVisibility: "hidden",
                  marginRight: 6,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 102.054 0 1.027 1.027 0 00-2.054 0zm5.557 1.027a1.027 1.027 0 110-2.054 1.027 1.027 0 010 2.054zm1.211 2.816a.77.77 0 00-.124-1.087.786.786 0 00-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 00-1.107-.135.786.786 0 00-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add icon
            </div>
          )}
          {!cover && (
            <div
              role="button"
              className="transition hover:bg-[#EFEFEF] cursor-pointer px-2 py-1 rounded-md text-sm text-[#37352f80] flex items-center"
            >
              <svg
                fill="rgba(55, 53, 47, 0.35)"
                className="addPageCover"
                display="block"
                viewBox="0 0 14 14"
                style={{
                  width: 14,
                  height: 14,
                  WebkitFlexShrink: "0",
                  MsFlexShrink: "0",
                  flexShrink: "0",
                  backfaceVisibility: "hidden",
                  marginRight: 6,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M2 0a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V2a2 2 0 00-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add cover
            </div>
          )}
          <div
            role="button"
            className={classNames(
              "transition hover:bg-[#EFEFEF] cursor-pointer px-2 py-1 rounded-md text-sm text-[#37352f80] flex items-center",
            )}
            onClick={() => setShowDescription(() => (showDescription ? false : true))}
          >
            <svg
              fill="rgba(55, 53, 47, 0.35)"
              className="collectionDescriptionSmall"
              display="block"
              viewBox="0 0 14 14"
              style={{
                width: 14,
                height: 14,
                WebkitFlexShrink: "0",
                MsFlexShrink: "0",
                flexShrink: "0",
                backfaceVisibility: "hidden",
                marginRight: 6,
              }}
            >
              <path
                fillRule="evenodd"
                d="M7 4.667a1.167 1.167 0 110-2.334 1.167 1.167 0 010 2.334zM8 11a1 1 0 11-2 0V7a1 1 0 012 0v4zM7 0a7 7 0 100 14A7 7 0 007 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            {showDescription ? "Hide description" : description ? "Show description" : "Add description"}
          </div>
        </div>
        <div className="flex pb-1">
          <EmojiPicker
            icon={icon}
            onChange={handleIconChange}
            open={openEmojiPicker}
            setOpen={setOpenEmojiPicker}
            className="mr-2"
          />
          <TextareaAutosize
            value={title}
            placeholder="Untitled"
            onChange={handleUpdateTitle}
            className="text-[32px] font-semibold text-[#37352f] outline-none resize-none w-full"
          />
        </div>
        {showDescription && (
          <TextareaAutosize
            value={description}
            className={classNames(
              "text-[#37352f] overflow-hidden w-full resize-none mb-4 text-sm outline-none placeholder:text-[#37352f80]",
            )}
            placeholder="Add a description..."
            onChange={handleUpdateDescription}
          />
        )}
      </section>
    </section>
  )
}

export default Heading
