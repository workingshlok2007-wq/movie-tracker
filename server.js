import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/movies", movieRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
