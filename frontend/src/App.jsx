// import { useEffect, useState } from "react";
// import axios from "axios";
// import MovieCard from "./components/MovieCard";
// window.scrollTo({ top: 0, behavior: "smooth" });


// function App() {
//   const [searchTitle, setSearchTitle] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     posterURL: "",
//     genre: "",
//     status: "Want to Watch"
//   });

//   // GET MOVIES
//   <h1 className="text-4xl font-bold text-center text-red-400">TEST</h1>
//   useEffect(() => {
//     axios.get("http://localhost:5000/movies")
//       .then(res => setMovies(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   // FORM CHANGE
//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   // ADD MOVIE
//   function handleSubmit(e) {
//     console.log("Sending to backend:", formData);

//     e.preventDefault();

//     axios.post("http://localhost:5000/movies", formData)
//       .then(res => {
//         setMovies([res.data, ...movies]);
//         setFormData({
//           title: "",
//           posterURL: "",
//           genre: "",
//           status: "Want to Watch"
//         });
//       })
//       .catch(err => console.log(err));
//   }

//   // UPDATE MOVIE (PATCH)
//   function updateMovie(id, updatedFields) {
//     axios.patch(`http://localhost:5000/movies/${id}`, updatedFields)
//       .then(res => {
//         setMovies(movies.map(m => (m._id === id ? res.data : m)));
//       })
//       .catch(err => console.log(err));
//   }

//   // DELETE MOVIE
//   function deleteMovie(id) {
//     axios.delete(`http://localhost:5000/movies/${id}`)
//       .then(() => {
//         setMovies(movies.filter(m => m._id !== id));
//       })
//       .catch(err => console.log(err));
//   }
// async function fetchFromOMDB() {
//   setSearchTitle("");
//   console.log("fetchFromOMDB called");  
//   if (searchTitle.trim() === "") return;

//   try {
//     const res = await axios.get(
//       `https://www.omdbapi.com/?t=${searchTitle}&apikey=9798f7f7`
//     );

//     if (res.data.Response === "False") {
//       alert("Movie not found");
//       return;
//     }

//     // Auto-fill form using OMDb data
//     setFormData({
//       title: res.data.Title,
//       posterURL: res.data.Poster,
//       genre: res.data.Genre?.split(",")[0] || "",
//       status: "Want to Watch"
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Movie Tracker</h1>
//       <h2>Search Movie (OMDb)</h2>
// <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//   <input
//     type="text"
//     placeholder="Enter movie name"
//     value={searchTitle}
//     onChange={(e) => setSearchTitle(e.target.value)}
//   />
//   <button onClick={fetchFromOMDB}>Fetch Details</button>
// </div>
// {formData.title && (
//   <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", width: "220px", borderRadius: "10px" }}>
//     <img
//       src={formData.posterURL}
//       alt={formData.title}
//       style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }}
//     />
//     <h3>{formData.title}</h3>
//     <p><strong>Genre:</strong> {formData.genre}</p>
//     <p><strong>Status:</strong> {formData.status}</p>
//   </div>
// )}


//       <h2>Add a Movie</h2>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <input type="text" name="title" placeholder="Movie Title" value={formData.title} onChange={handleChange} required />
//         <input type="text" name="posterURL" placeholder="Poster URL" value={formData.posterURL} onChange={handleChange} />
//         <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required />

//         <select name="status" value={formData.status} onChange={handleChange}>
//           <option value="Want to Watch">Want to Watch</option>
//           <option value="Watching">Watching</option>
//           <option value="Completed">Completed</option>
//         </select>

//         <button type="submit">Add</button>
//       </form>

//       {/* MOVIE CARDS */}
//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         {movies.map(movie => (
//           <MovieCard
//             key={movie._id}
//             movie={movie}
//             updateMovie={updateMovie}
//             deleteMovie={deleteMovie}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Want to Watch");

  // 🔹 GET MOVIES FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 FETCH FROM OMDb
  async function fetchFromOMDB() {
    if (!searchTitle.trim()) return;

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          searchTitle.trim()
        )}&apikey=9798f7f7`
      );

      if (res.data.Response === "False") {
        alert("Movie not found");
        return;
      }

      setPreview({
        title: res.data.Title,
        posterURL:
          res.data.Poster && res.data.Poster !== "N/A"
            ? res.data.Poster
            : "https://via.placeholder.com/200x300?text=No+Image",
        genre:
          res.data.Genre && res.data.Genre !== "N/A"
            ? res.data.Genre.split(",")[0]
            : "Unknown",
      });
    } catch (err) {
      console.error(err);
    }
  }

  // 🔹 ADD MOVIE TO BACKEND
  function addMovie() {
    if (!preview) return;

    axios
      .post("http://localhost:5000/movies", {
        title: preview.title,
        posterURL: preview.posterURL,
        genre: preview.genre,
        status: selectedStatus,
      })
      .then((res) => {
        setMovies([res.data, ...movies]);
        setPreview(null);
        setSearchTitle("");
      })
      .catch((err) => console.error(err));
  }

  // 🔹 UPDATE MOVIE (status / rating)
  function updateMovie(id, updatedFields) {
    axios
      .patch(`http://localhost:5000/movies/${id}`, updatedFields)
      .then((res) => {
        setMovies(movies.map((m) => (m._id === id ? res.data : m)));
      })
      .catch((err) => console.error(err));
  }

  // 🔹 DELETE MOVIE
  function deleteMovie(id) {
    axios
      .delete(`http://localhost:5000/movies/${id}`)
      .then(() => {
        setMovies(movies.filter((m) => m._id !== id));
      })
      .catch((err) => console.error(err));
  }

  // 🔹 FILTER BY STATUS
  function byStatus(status) {
    return movies.filter((m) => m.status === status);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Movie Tracker</h1>
        <p className="app-subtitle">
          Search movies, categorize them, and track your watching status.
        </p>
      </header>

      {/* SEARCH + PREVIEW */}
      <section className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search a movie (e.g. Interstellar, Fight Club)"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="search-input"
          />
          <button onClick={fetchFromOMDB} className="primary-button">
            Search
          </button>
        </div>

        {preview && (
          <div className="preview-card">
            <div className="preview-poster-wrapper">
              <img
                src={preview.posterURL}
                alt={preview.title}
                className="preview-poster"
              />
            </div>
            <div className="preview-info">
              <h2 className="preview-title">{preview.title}</h2>
              <p className="preview-genre">{preview.genre}</p>

              <div className="preview-controls">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="Want to Watch">Want to Watch</option>
                  <option value="Watching">Watching</option>
                  <option value="Completed">Completed</option>
                </select>

                <button onClick={addMovie} className="primary-button">
                  Add to List
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3 COLUMNS */}
      <section className="columns-section">
        <div className="column">
          <h2 className="column-title">Want to Watch</h2>
          {byStatus("Want to Watch").length === 0 && (
            <p className="empty-text">No movies here yet.</p>
          )}
          {byStatus("Want to Watch").map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              updateMovie={updateMovie}
              deleteMovie={deleteMovie}
            />
          ))}
        </div>

        <div className="column">
          <h2 className="column-title">Watching</h2>
          {byStatus("Watching").length === 0 && (
            <p className="empty-text">Start watching something!</p>
          )}
          {byStatus("Watching").map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              updateMovie={updateMovie}
              deleteMovie={deleteMovie}
            />
          ))}
        </div>

        <div className="column">
          <h2 className="column-title">Completed</h2>
          {byStatus("Completed").length === 0 && (
            <p className="empty-text">Finish some movies first 😉</p>
          )}
          {byStatus("Completed").map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              updateMovie={updateMovie}
              deleteMovie={deleteMovie}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
