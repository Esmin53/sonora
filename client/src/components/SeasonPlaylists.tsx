import { Link } from 'react-router-dom'
import { SEASON_PLAYLISTS } from '../lib/data'
import { FaCanadianMapleLeaf, FaLeaf, FaSnowflake, FaSun } from 'react-icons/fa6'

const SeasonPlaylists = () => {
  return (
    <div className='w-full'>
                        <div className='w-fit mt-6 md:mt-12'>
                    <h2 className='text-3xl md:text-4xl font-bold'>Cant wait for a season change<span className='dark:text-accent-dark text-accent-light'>?</span></h2>
                    <div className='w-4/5 h-1 rounded-r-full bg-accent-light my-2' />
                </div>
                <p className='sm:text-lg font-medium'>Seasons change in an instant with these playlists</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pt-2 md:pt-4'>
                    {SEASON_PLAYLISTS.map((item, index) => <Link to={`/playlists?keywords=${item.keyword}&label=${item.label}`} className={`aspect-square ${item.color} rounded flex items-center justify-center cursor-pointer hover:animate-pulse skulls relative`} key={index}>
                        {index == 0 ? <FaLeaf className='absolute w-3/4 h-3/4 opacity-40 z-0' /> : null}
                        {index == 1 ? <FaSun className='absolute w-3/4 h-3/4 opacity-40 z-0' /> : null}
                        {index == 2 ? <FaCanadianMapleLeaf className='absolute w-3/4 h-3/4 opacity-40 z-0' /> : null}
                        {index == 3 ? <FaSnowflake className='absolute w-3/4 h-3/4 opacity-40 z-0' /> : null}
                        <p className='text-3xl sm:text-4xl font-medium antialiased text-text-dark z-10'>{item.label}</p>
                    </Link>)}

                </div>                  

    </div>
  )
}

export default SeasonPlaylists