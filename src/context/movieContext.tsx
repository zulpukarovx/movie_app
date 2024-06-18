import React, { createContext, useState, useEffect } from "react";
import { fetchMovies, fetchMovieById } from "../services/movieService";
import { Movie, MovieDetailsType } from "../types";

interface MovieContextValue {
  movies: Movie[];
  setMovies: () => void;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchMovies: () => Promise<void>;
  fetchMovieDetails: (movieId: number) => Promise<void>;
  movieDetails: MovieDetailsType | null;
  setLimit: (limit: number) => void
  setTotalPages: (totalPages: number) => void
}
export const MovieContext = createContext<MovieContextValue | undefined>(
  undefined
);

interface MovieProviderProps {
  children: React.ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(50)

  const fetchMovieDetails = async (movieId: number) => {
    setIsLoading(true);
    try {
      const movieDetails = await fetchMovieById(movieId);
      return movieDetails;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  //for handling the page pagination
  // useEffect(() => {
  //   const getMovies = async () => {
  //     try {
  //       setIsLoading(true);
  //       const movies = await fetchMovies();
  //       setMovies(movies.docs);
  //       setTotalPages(movies.pages);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getMovies();
  // }, [currentPage]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        isLoading,
        totalPages,
        setTotalPages,
        setLimit,
        currentPage,
        setCurrentPage,
        fetchMovies,
        fetchMovieDetails,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
