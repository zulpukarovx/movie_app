// src/pages/FavoritesPage.tsx
import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { fetchMovieById } from "../services/movieService";
import { Movie } from "../types";
import { Link } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";


const FavoritesPage: React.FC = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      setIsLoading(true);
      try {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        const movies = await Promise.all(
          bookmarks.map((id) => fetchMovieById(id))
        );
        setBookmarkedMovies(movies);
      } catch (err) {
        setError("Error fetching bookmarked movies");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookmarkedMovies();
  }, []);

  return (
    <>
      <section className="favorite__section">
        <div className="go-back__button">
          <Link to='/'><ArrowBack sx={{fontSize: 46}} /></Link>
        </div>
        <Grid container spacing={2} sx={{ py: 8, alignItems: "center", justifyContent: "center" }}>
          {bookmarkedMovies.map((movie) => (
            <Grid item key={movie.id} xs={8} sm={4} md={3} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  );
};

export default FavoritesPage;
