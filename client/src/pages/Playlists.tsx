import { GiRose } from "react-icons/gi"
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuLoaderCircle } from "react-icons/lu";

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  owner: {
    display_name: string
  },
  tracks: {
    total: number
  }
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Playlists = () => {
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[] >([])
    const [page, setPage] = useState<number >(0)
    const [isLoading, setIsLoading] = useState<boolean >(true)
    const [isFetching, setIsFetching] = useState<boolean >(false)

    const [searchParams] = useSearchParams();
    const label = searchParams.get("label") || "";
    const keywords = searchParams.get("keywords") || "";

    const getData = async () => {
        setIsFetching(true)
        try {
             const response = await axios.get(`${serverUrl}/playlists?keywords=${keywords}&page=${page}`)

            if (page === 0) {
                setPlaylists(response.data); 
            } else {
                setPlaylists(prev => [...prev, ...response.data]);
            }  
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setIsFetching(false)
        }
    }

  useEffect(() => {
    getData()
  }, [page])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='dark:bg-background-dark bg-background-light text-text-light dark:text-text-dark w-full min-h-screen flex flex-col items-center'>
        <div className="w-full flex items-center flex-col dark:bg-foreground-dark bg-foreground-light ">
            <div className="w-full max-w-7xl relative flex justify-center min-h-56">
                <img src="/worldmap.svg" className="w-5/6 object-cover"/>
                <img src="/banner.png" className="absolute h-4/6 sm:h-5/6 bottom-0 left-0"/>
                <h1 className="font-bold text-6xl sm:text-7xl md:text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">{label}</h1>
                <Link to={"/"} className="absolute bottom-2 right-2 flex gap-1 items-center font-medium sm:text-accent-dark sm:text-lg">
                    <FaArrowLeftLong />
                    Back
                </Link>
            </div>
        </div>
        <div className='w-full flex justify-center'>
            {!isLoading ? <div className='w-full max-w-7xl flex flex-col py-4 md:py-8 px-4'>
                <div className='w-fit mt-2 sm:mt-4'>
                    <div className="flex gap-1 items-center shadow">
                        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>These playlists are for you</h2>
                        <GiRose className="w-6 h-6 md:w-10 md:h-10 dark:text-accent-dark text-accent-light"/>
                    </div>
                    <div className='w-4/5 h-0.5 md:h-1 rounded-r-full bg-accent-light my-0.5 md:my-2' />
                    <p className='text-sm md:text-lg md:font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, dignissimos.</p>
                </div>
                <div className="w-full flex flex-col pt-4 sm:pt-8 gap-4 sm:gap-2">
                    {playlists?.map((item) => item && <div className="flex flex-col sm:flex-row min-h-52 lg:min-h-64 gap-4" key={item?.id}>
                        <div className="h-64 sm:h-52 lg:h-64 aspect-square rounded bg-foreground-light dark:bg-foreground-dark relative ">
                            {item?.images.length ? <img src={item.images[0].url} className="w-full h-full object-fill sm:object-cover rounded" /> : null}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <h1 className="text-2xl lg:text-3xl font-semibold wrap-break-words">{item?.name}</h1>
                            <p className="wrap-break-words max-w-full overflow-hidden">
                                {item?.description}
                            </p>
                            <p className="font-medium"> {item?.owner?.display_name}</p>
                            <p className="text-xl lg:text-2xl font-medium">{item?.tracks?.total} tracks</p>
                            <div className="w-full flex items-center justify-evenly mt-auto mb-12">
                                <a href={`https://open.spotify.com/playlist/${item?.id}`} target="#" className="text-lg font-medium text-[#1DB954] cursor-pointer">Spotify</a>
                                <Link to={`/playlist/${item?.id}`} className="text-lg font-medium text-accent-light dark:text-accent-dark cursor-pointer">Preview</Link>
                            </div>
                        </div>
                    </div>)}
                    {playlists?.length ? <div className="w-full flex items-center justify-center text-2xl font-medium dark:text-accent-dark text-accent-light cursor-pointer sm:mt-8" onClick={() => setPage(prev => prev + 1)}>
                        {isFetching ? <LuLoaderCircle className="animate-spin"/> : "Load more"}
                    </div> : null}
                </div>
            </div> : <div className="w-full h-56 flex items-center justify-center">
                    <LuLoaderCircle className="animate-spin w-12 h-12 text-accent-dark"/>
                </div>}
        </div>
    </div>
  )
}

export default Playlists