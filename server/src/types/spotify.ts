export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

export interface SpotifySearchResponse {
  playlists: {
    items: SpotifyPlaylist[];
  };
}