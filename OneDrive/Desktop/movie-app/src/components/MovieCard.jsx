import React from 'react';

function MovieCard({ posterPath, title, voteAverage }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const imageUrl = posterPath ? `${imageBaseUrl}${posterPath}` : 'https://via.placeholder.com/500x750.png?text=No+Image';

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </div>
    </div>
  );
}

export default MovieCard;