import { ChangeEvent, useRef } from "react"

interface Props {
  src: string
}

const Cover = ({ src }: Props) => {
  const coverSrc = `http://localhost:8000/${src}`

  const inputRef = useRef<any>(null)

  const openChooseFile = () => inputRef.current.click()

  const handleUploadCover = () => {
    openChooseFile()
  }

  const onSubmit = (e: any) => {}

  return (
    <div className="relative w-full h-48 overflow-hidden group">
      <img src={coverSrc} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 text-[#37352fa6] translate-x-1/2 right-1/4 overflow-hidden select-none bg-white text-xs flex shadow-[0px_0px_0px_1px_#0f0f0f1a,0px_2px_4px_#0f0f0f1a] rounded-[3px] duration-150 opacity-0 group-hover:opacity-100">
        <div
          role="button"
          className="pt-1 pb-1.5 px-1.5 hover:bg-[#efefee] active:bg-[#dfdfde] border-r border-r-[#37352f17]"
          onClick={handleUploadCover}
        >
          Change cover
        </div>
        <div role="button" className="pt-1 pb-1.5 px-1.5 hover:bg-[#efefee] active:bg-[#dfdfde]">
          Remove cover
        </div>
        <form onSubmit={onSubmit}>
          <input ref={inputRef} type="file" hidden accept=".png,.jpg,.jpeg" />
        </form>
      </div>
    </div>
  )
}

export default Cover
