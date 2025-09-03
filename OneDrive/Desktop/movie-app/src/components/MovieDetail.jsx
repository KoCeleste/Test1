import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch('/movieDetailData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMovie(data))
      .catch(error => {
        console.error('Error fetching movie detail data:', error);
      });
  }, [movieId]);

  if (!movie) {
    return <div>로딩 중...</div>;
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const backdropImageUrl = movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : 'https://via.placeholder.com/1920x1080.png?text=No+Backdrop';
  const posterImageUrl = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750.png?text=No+Poster';

  return (
    <div className="movie-detail-container">
      <div className="movie-backdrop" style={{ backgroundImage: `url(${backdropImageUrl})` }}>
        <div className="overlay"></div>
      </div>
      <div className="movie-content">
        <div className="content-flex-container">
          <div className="poster-container">
            <img src={posterImageUrl} alt={movie.title} className="movie-poster" />
          </div>
          <div className="info-container">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-rating">평균 평점: {movie.vote_average}</p>
            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;