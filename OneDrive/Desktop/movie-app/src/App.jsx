import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Layout from './components/Layout';
import './App.css';

function MainPage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/movieListData.json')
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/details/${movieId}`);
  };

  return (
    <>
      <h1 className="page-title">영화 목록</h1>
      <div className="movie-list-container">
        {movies.map(movie => (
          <div onClick={() => handleMovieClick(movie.id)} key={movie.id}>
            <MovieCard
              posterPath={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/details/:movieId" element={<MovieDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;