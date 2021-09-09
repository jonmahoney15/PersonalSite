const SkeltonLoader = () => {
  return (
    <div className="mx-auto mt-20 border-2 h-36 w-60 rounded-md">
      <div className="flex flex-row items-center justify-center h-full animate-pulse space-x-5">
        <div className="w-16 h-24 bg-gray-300 rounded ">
        </div>
        <div className="flex flex-col space-y-3">
          <div className="h-6 bg-gray-300 w-36 rounded-md ">
          </div>
          <div className="h-6 bg-gray-300 w-36 rounded-md ">
          </div>
          <div className="w-24 h-6 bg-gray-300 rounded-md ">
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeltonLoader;
