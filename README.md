# Movie Tracker App

A full-stack movie tracking application built with React, Vite, Express, and MongoDB. Users can search for movies using the OMDb API, add them to their personal watchlist, and organize them into categories such as "Want to Watch", "Watching", and "Completed".

## Features

- Search movies by title using the OMDb API
- Preview movie details before adding to your list
- Add movies to a personal tracker with genre and status
- Organize movies into three sections:
  - Want to Watch
  - Watching
  - Completed
- Update movie status and rating
- Delete movies from the list
- Persistent storage with MongoDB
- Fallback in-memory behavior when MongoDB is not available

## Tech Stack

- Frontend: React + Vite
- Styling: CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- API integration: OMDb API

## Project Structure

```bash
movie-tracker-app/
├── models/
│   └── movie.js
├── public/
├── routes/
│   └── movieRoutes.js
├── src/
│   ├── App.jsx
│   ├── components/
│   ├── assets/
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── server.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- MongoDB installed and running locally
- A valid OMDb API key

## Environment Variables

Create a `.env` file in the project root with the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/Movie-tracker
```

If you want to use OMDb search, ensure the API key is included in the frontend request code. The app currently uses a hardcoded OMDb API key in the React frontend.

## Installation

```bash
npm install
```

## Run the App

Start MongoDB locally:

```bash
mongod
```

Start the backend server:

```bash
node server.js
```

Start the frontend development server in a second terminal:

```bash
npm run dev
```

Then open:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Available Scripts

```bash
npm run dev     # start Vite frontend
npm run build   # build the project for production
npm run preview # preview production build
npm run lint    # run ESLint
```

## API Endpoints

### Movies

- `GET /movies` — Fetch all movies
- `POST /movies` — Add a new movie
- `PATCH /movies/:id` — Update a movie
- `DELETE /movies/:id` — Delete a movie

## Notes

- The backend is configured to accept requests from `http://localhost:5173`.
- If MongoDB is not connected, the app falls back to an in-memory store to keep the app functional for basic testing.
- The app stores movie data in MongoDB when the database is available.

## License

This project is for educational/demo purposes.
