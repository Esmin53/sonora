

const PlaylistPreview = () => {
  return (
<div className='dark:bg-background-dark bg-background-light text-text-light dark:text-text-dark w-full min-h-screen flex flex-col items-center'>
        <div className="w-full flex items-center flex-col dark:bg-foreground-dark bg-foreground-light ">
            <div className="w-full max-w-7xl relative flex justify-center min-h-56">
                <img src="/worldmap.svg" className="w-5/6 object-cover"/>
                <img src="/banner.png" className="absolute h-4/6 sm:h-5/6 bottom-0 left-0"/>
                <h1 className="font-bold text-6xl sm:text-7xl md:text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">Sui</h1>

            </div>
        </div>
        <div className='w-full flex justify-center'>

        </div>
    </div>
  )
}

export default PlaylistPreview