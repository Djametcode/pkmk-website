import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import { adminRouter } from "./routes/adminRoutes.js";
import { v2 as cloudinary } from "cloudinary";
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors());

app.use(express.json());

//admin route
app.use("/api/pkmk-javac/admin", adminRouter);

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(3000, () => console.log("Server running ..."));
  } catch (error) {
    console.log(error);
  }
}

startServer();
