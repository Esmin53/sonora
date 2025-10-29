import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { SpotifyPlaylist, SpotifySearchResponse } from "./types/spotify";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

async function getSpotifyToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  const data: any = await response.json();
  return data.access_token;
}

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.get("/playlists", async (req, res) => {
  try {
    const { keywords } = req.query;
    const { page }  = req.query || 0
    if (!keywords) return res.status(400).json({ error: "Missing keywords" });
    
    const offset = Number(page) * 10
    console.log("Page", page)

    const token = await getSpotifyToken();

    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        //@ts-ignore
        keywords
      )}&type=playlist&limit=10&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data= await spotifyResponse.json() as SpotifySearchResponse;
    console.log("DATA:  ",data)
    res.json(data.playlists.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

app.get("/playlist/:id", async (req, res) => {
  const { id } = req.params;
  const token = await getSpotifyToken();

  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  res.json(data);
});


app.listen(PORT, () => {
  console.log(`Brzo trcim server na ${PORT} `);
});