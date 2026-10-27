// import axios from "axios";

// function MovieCard({ movie, updateMovie, deleteMovie }) {
//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: "10px",
//         borderRadius: "10px",
//         width: "220px",
//         marginBottom: "20px"
//       }}
//     >
//       <img
//         src={movie.posterURL}
//         alt={movie.title}
//         style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }}
//       />

//       <h3>{movie.title}</h3>
//       <p><strong>Genre:</strong> {movie.genre}</p>

//       {/* STATUS DROPDOWN */}
//       <select
//         value={movie.status}
//         onChange={(e) => updateMovie(movie._id, { status: e.target.value })}
//       >
//         <option value="Want to Watch">Want to Watch</option>
//         <option value="Watching">Watching</option>
//         <option value="Completed">Completed</option>
//       </select>

//       {/* RATING */}
//       <div style={{ marginTop: "10px" }}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             style={{
//               cursor: "pointer",
//               color: movie.rating >= star ? "gold" : "gray",
//               fontSize: "22px"
//             }}
//             onClick={() => updateMovie(movie._id, { rating: star })}
//           >
//             ★
//           </span>
//         ))}
//       </div>

//       {/* DELETE BUTTON */}
//       <button
//         style={{
//           marginTop: "10px",
//           background: "red",
//           color: "white",
//           border: "none",
//           padding: "5px 10px",
//           borderRadius: "5px",
//           cursor: "pointer"
//         }}
//         onClick={() => deleteMovie(movie._id)}
//       >
//         Delete
//       </button>
//     </div>
//   );
// }

// export default MovieCard;
function MovieCard({ movie, updateMovie, deleteMovie }) {
  const handleStatusChange = (e) => {
    updateMovie(movie._id, { status: e.target.value });
  };

  const handleRatingChange = (rating) => {
    updateMovie(movie._id, { rating });
  };

  return (
    <div className="movie-card">
      <div className="movie-card-main">
        <img
          src={movie.posterURL}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-genre">{movie.genre}</p>

          <select
            value={movie.status}
            onChange={handleStatusChange}
            className="status-select small"
          >
            <option value="Want to Watch">Want to Watch</option>
            <option value="Watching">Watching</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="rating-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={
                  movie.rating >= star ? "star star-filled" : "star star-empty"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <button className="delete-button" onClick={() => deleteMovie(movie._id)}>
        Delete
      </button>
    </div>
  );
}

export default MovieCard;

