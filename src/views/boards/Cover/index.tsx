const Cover = () => {
  return (
    <div className="relative w-full h-48 overflow-hidden group">
      <img src="/images/covers/cover-1.jpg" className="w-full h-full object-cover" />
      <div className="absolute bottom-2 text-[#37352fa6] translate-x-1/2 right-1/4 overflow-hidden select-none bg-white text-xs flex shadow-[0px_0px_0px_1px_#0f0f0f1a,0px_2px_4px_#0f0f0f1a] rounded-[3px] duration-150 opacity-0 group-hover:opacity-100">
        <div
          role="button"
          className="pt-1 pb-1.5 px-1.5 hover:bg-[#efefee] active:bg-[#dfdfde] border-r border-r-[#37352f17]"
        >
          Change cover
        </div>
        <div role="button" className="pt-1 pb-1.5 px-1.5 hover:bg-[#efefee] active:bg-[#dfdfde]">
          Reposition
        </div>
      </div>
    </div>
  )
}

export default Cover
