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
  limit: number;
  setLimit: (limit: number) => void;
  setTotalPages: (totalPages: number) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  rating: string;
  setRating: React.Dispatch<React.SetStateAction<string>>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
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
  const [limit, setLimit] = useState(50);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [rating, setRating] = useState<string>("");
  const [year, setYear] = useState<string>("")

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

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        isLoading,
        totalPages,
        setTotalPages,
        limit,
        setLimit,
        currentPage,
        setCurrentPage,
        fetchMovies,
        fetchMovieDetails,
        setSelectedGenre,
        selectedGenre,
        rating,
        setRating,
        year,
        setYear,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
