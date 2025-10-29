import axios from "axios"
import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  owner: { display_name: string };
  followers: { total: number };
  tracks: {
    items: {
      track: {
        id: string;
        name: string;
        preview_url: string | null;
        duration_ms: number;
        artists: { name: string }[];
        album: { images: { url: string }[] };
      };
    }[];
  };
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const PlaylistPreview = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean >(true)


  const getPlaylist = async () => {
    try {
        const response = await axios.get(`${serverUrl}/playlist/${id}`)

        setPlaylist(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0,0)
    getPlaylist()
  }, [])

  return (
<div className='dark:bg-background-dark bg-background-light text-text-light dark:text-text-dark w-full min-h-screen flex flex-col items-center'>
        <div className="w-full flex items-center flex-col dark:bg-foreground-dark bg-foreground-light ">
            <div className="w-full max-w-7xl relative flex flex-col sm:flex-row min-h-56 py-1 sm:py-8 sm:gap-4 lg:gap-8 px-4">
              <img src="/soundwave.svg" className="absolute w-4/6 right-0 z-0 opacity-50 dark:opacity-80 top-1/2 -translate-y-1/2"/>
              <div className="p-4 sm:h-60 lg:h-72 sm:aspect-square rounded relative">
                  {!isLoading && playlist?.images.length ? <img src={playlist?.images[0].url} className="w-full object-cover rounded"/> : null}
                  {isLoading ? <div className="w-full h-full bg-background-light dark:bg-background-dark animate-pulse"/> : null}
              </div>
              <div className="flex flex-1 flex-col justify-end gap-2 py-4 z-10">
                {!isLoading ? <div className="flex justify-evenly flex-wrap sm:justify-start gap-2 sm:gap-8 items-center">
                  <p className="text-xs font-medium">{playlist?.id}</p>
                  <p className="text-sm font-medium">{playlist?.owner?.display_name}</p>
                  <p className="text-sm font-medium">{playlist?.followers?.total} followers</p>
                </div> : null}
                {!isLoading ? <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">{playlist?.name} </h1> : <div className="w-2/5 h-8 dark:bg-background-dark bg-background-light animate-pulse" />}
                <p className="textl-sm md:text-base">{playlist?.description} </p>
                <div className="flex gap-8 w-full justify-evenly sm:justify-start">
                    <Link to={`/`} className="text-lg font-medium text-accent-light dark:text-accent-dark cursor-pointer">Back home</Link>
                    <a href={`https://open.spotify.com/playlist/${id}`} target="#" className="text-lg font-medium text-[#1DB954] cursor-pointer">Go to Spotify</a>
                </div>

              </div>
            </div>
        </div>
        <div className='w-full flex justify-center'>
            {!isLoading ? <div className="w-full max-w-5xl relative flex flex-col min-h-56 py-8 gap-2 px-4">
                {playlist?.tracks?.items.map ((item) => <div className="flex gap-2">
                  <div className="h-20 relative aspect-square dark:bg-foreground-dark bg-foreground-light rounded-sm shadow-sm">
                    <img className="h-full object-cover rounded-sm shadow-sm" src={item?.track?.album.images[0].url } />
                  </div>
                      <div className="flex-1 flex flex-col">
                        <p className="text-lg sm:text-xl font-medium">{item.track.name} </p>
                        <div className="flex gap-2 flex-wrap">
                          {item?.track?.artists.map((item) => <p>{item.name} </p>)} 
                        </div>
                        <p className="text-sm">{formatDuration(item?.track?.duration_ms)} </p>
                      </div>
                </div>)}
            </div> : <div className="w-full h-40 flex items-center justify-center">
                  <LuLoaderCircle className="w-8 h-8 animate-spin text-accent-dark" />
              </div>}

        </div>
    </div>
  )
}

export default PlaylistPreview