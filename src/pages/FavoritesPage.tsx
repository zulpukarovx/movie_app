import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { fetchMovieById } from "../services/movieService";
import { Movie } from "../types";
import { Link, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      setIsLoading(true);
      try {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        const movies = await Promise.all(
          bookmarks.map((id: number) => fetchMovieById(id))
        );
        console.log("movies fetched")
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


  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="favorite__section">
        <div className="go-back__button">
          <Link to='/'><ArrowBack sx={{fontSize: 46}} /></Link>
        </div>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 3, lg: 3 }}
          columns={{ xs: 3, sm: 4, md: 9, lg: 12 }}
          sx={{ py: 8, alignItems: "center", justifyContent: "center" }}
        >
          {bookmarkedMovies && bookmarkedMovies.map((movie) => {
            return (
              <Grid
                item
                xs={3}
                sm={2}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
                key={movie.id}
                onClick={() => navigate({ pathname: `/movie/${movie.id}` })}
              >
                <MovieCard movie={movie} />
              </Grid>
            )
          })}
        </Grid>
      </section>
    </>
  );
};

export default FavoritesPage;