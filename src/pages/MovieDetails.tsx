import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../services/movieService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { MovieDetailsType } from "../types";


const MovieDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);

  useEffect(() => {
    if (!id) return;
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const movieDetails = await fetchMovieById(Number(id));
        setMovieDetails(movieDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);

  return (
    <section>
      {movieDetails && (
        <div className="movieDetails">
          <div className="go-back__button">
            <Link to='/'><ArrowBackIcon sx={{fontSize: 46}} /></Link>
          </div>
          <header><h1 className="movieDetails__title">{movieDetails.name}</h1></header>
          <div className="movieDetails__main-content">
            <div className="movieDetails__info-left">
              <ul className="movieDetials__movie-list">
                <li className="movieDetia__movie-item">
                  <p className="movieDetails__movie-text">Год производства:</p>
                  <p className="movieDetails__movie-text">{movieDetails.year}</p>
                </li>
                <li className="movieDetia__movie-item">
                  <p className="movieDetails__movie-text">Страны:</p>
                  <p className="movieDetails__movie-text text-right">{movieDetails.countries.map(country => country.name + " ")}</p>
                </li>
                <li className="movieDetia__movie-item">
                  <p className="movieDetails__movie-text">Жанры:</p>
                  <p className="movieDetails__movie-text text-right">{movieDetails.genres.map(item => item.name + " ")}</p>
                </li>
                <li className="movieDetia__movie-item">
                  <p className="movieDetails__movie-text">Год выпуска:</p>
                  <p className="movieDetails__movie-text text-right">{movieDetails.year}</p>
                </li>
                <li className="movieDetia__movie-item">
                  <p className="movieDetails__movie-text">Возрастной рейтинг:</p>
                  <p className="movieDetails__movie-text text-right">{movieDetails.ageRating}</p>
                </li>
                <li className="movieDetia__movie-item">
                  <p className="movieDetails__movie-text">Рейтинг КП:</p>
                  <p className="movieDetails__movie-text text-right">{movieDetails.rating.kp}</p>
                </li>
                <li className="movieDetia__movie-item">
                  <p className="movieDetails__movie-text">Рейтинг IMDB:</p>
                  <p className="movieDetails__movie-text text-right">{movieDetails.rating.imdb}</p>
                </li>
              </ul>
            </div>
            <div className="movieDetails__info-right">
              {
                isLoading ? (
                    <Skeleton variant="rectangular" width="100%"></Skeleton>
                ) : (
                  <img className="movieDetails__poster" src={movieDetails.poster.url} alt={`Постер фильма ${movieDetails.name}`} />
                )
              }
            </div>
          </div>
          <div className="movieDetails__movie-description"><p>{movieDetails.description}</p></div>
        </div>
      )}
    </section>
  );
};

export default MovieDetails;
