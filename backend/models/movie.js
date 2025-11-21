const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    posterURL: String,
    genre: { type: String, required: true },
    status: {
      type: String,
      enum: ["Want to Watch", "Watching", "Completed"],
      default: "Want to Watch"
    },
    rating: { type: Number, default: 0 }, // 0–5
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
