import Banner from '../components/Banner'
import { MOOD_PLAYLISTS } from '../lib/data'
import SeasonPlaylists from '../components/SeasonPlaylists'
import EraPlaylists from '../components/ErasPlaylists'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='dark:bg-background-dark bg-background-light text-text-light dark:text-text-dark w-full min-h-screen flex flex-col items-center'>
        <div className='w-full flex flex-col justify-center items-center bg-foreground-light dark:bg-foreground-dark pb-4 md:pb-8 px-4'>
            <Banner />
        </div>
        <div className='w-full flex justify-center'>
            <div className='w-full max-w-7xl flex flex-col py-4 md:py-8 px-4'>
                <div className='w-fit mt-2 sm:mt-4'>
                    <h2 className='text-3xl md:text-4xl font-bold'>How are you feeling today<span className='dark:text-accent-dark text-accent-light'>?</span></h2>
                    <div className='w-4/5 h-1 rounded-r-full bg-accent-light my-2' />
                </div>
                <p className='sm:text-lg font-medium'>Choose a customized playlist baset on your current mood</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pt-2 md:pt-4'>
 
                    {MOOD_PLAYLISTS.map((item, index) => <Link to={`/playlists?keywords=${item.keyword}&label=${item.label}`} className={`aspect-square ${item.color} rounded flex items-center justify-center cursor-pointer hover:animate-pulse relative shadow-sm`} key={index}>
                        <img className='absolute w-full z-0 opacity-30' src='/soundwave2.svg' />
                        <p className='text-3xl sm:text-4xl font-medium antialiased text-text-dark z-10'>{item.label}</p>
                    </Link>)}
                </div>
                <SeasonPlaylists />
                <EraPlaylists />
            </div>
        </div>
    </div>
  )
}

export default Home