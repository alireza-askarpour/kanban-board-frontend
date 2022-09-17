const AppLoadingView = () => {
  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <div className="flex justify-center">
        <div className="w-4 h-4 my-8 mx-1.5 bg-gray-800 rounded-full animate-[loading_0.9s_infinite_alternate]"></div>
        <div className="w-4 h-4 my-8 mx-1.5 bg-gray-800 rounded-full animate-[loading_0.9s_0.3s_infinite_alternate]"></div>
        <div className="w-4 h-4 my-8 mx-1.5 bg-gray-800 rounded-full animate-[loading_0.9s_0.6s_infinite_alternate]"></div>
      </div>
    </div>
  )
}

export default AppLoadingView
