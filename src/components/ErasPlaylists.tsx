import { ERA_PLAYLISTS } from '../lib/data'

const EraPlaylists = () => {
  return (
    <div className='w-full'>
                        <div className='w-fit mt-6 md:mt-12'>
                    <h2 className='text-3xl md:text-4xl font-bold'>Feeling nostalgic<span className='dark:text-accent-dark text-accent-light'>?</span></h2>
                    <div className='w-4/5 h-1 rounded-r-full bg-accent-light my-2' />
                </div>
                <p className='sm:text-lg font-medium'>Travel in time with these playlists</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pt-2 md:pt-4'>
                    {ERA_PLAYLISTS.map((item, index) => <div className={`aspect-square ${item.color} rounded flex items-center justify-center cursor-pointer hover:animate-pulse skulls relative`} key={index}>
                        <img className='absolute w-full z-0 opacity-30' src='/soundwave2.svg' />
                        <p className='text-3xl sm:text-4xl font-medium antialiased text-text-dark z-10'>{item.label}</p>
                    </div>)}

                </div>                  

    </div>
  )
}

export default EraPlaylists