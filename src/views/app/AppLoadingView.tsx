const AppLoadingView = () => {
  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <div className="pointer-events-none w-12 h-12 border-gray-300 border-[6px] border-t-[#3E67EC] rounded-full  animate-[loadingspin_1s_linear_infinite]"></div>
    </div>
  )
}

export default AppLoadingView
