import express from "express";
import mongoose from "mongoose";
import Movie from "../models/movie.js";

const router = express.Router();
const inMemoryMovies = [];

const isDatabaseConnected = () => mongoose.connection.readyState === 1;

router.post("/", async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      const movie = {
        _id: `${Date.now()}-${Math.random()}`,
        title: req.body.title,
        posterURL: req.body.posterURL,
        genre: req.body.genre,
        status: req.body.status || "Want to Watch",
        rating: 0,
        notes: req.body.notes || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemoryMovies.unshift(movie);
      return res.status(201).json(movie);
    }

    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.json([...inMemoryMovies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }

    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      const movieIndex = inMemoryMovies.findIndex((movie) => movie._id === req.params.id);
      if (movieIndex === -1) {
        return res.status(404).json({ error: "Movie not found" });
      }

      inMemoryMovies[movieIndex] = {
        ...inMemoryMovies[movieIndex],
        ...req.body,
        updatedAt: new Date().toISOString(),
      };

      return res.json(inMemoryMovies[movieIndex]);
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      const initialLength = inMemoryMovies.length;
      const filtered = inMemoryMovies.filter((movie) => movie._id !== req.params.id);
      inMemoryMovies.length = 0;
      inMemoryMovies.push(...filtered);

      if (filtered.length === initialLength) {
        return res.status(404).json({ error: "Movie not found" });
      }

      return res.json({ message: "Movie deleted" });
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
