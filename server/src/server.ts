import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Brzo trcim server na ${PORT} `);
});