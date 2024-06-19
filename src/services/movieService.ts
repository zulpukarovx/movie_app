import { Genre, Movie, MovieDetailsType } from "../types";

const API_URL_BASE = "https://api.kinopoisk.dev/v1.4/movie";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchGenres = async () => {
  const API_URL_QUERY = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name'
  try {
    const response = await fetch(API_URL_QUERY, {
      headers: { "X-API-KEY": API_KEY },
    });
    const data = await response.json()
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data as Genre [];
  } catch (error) {
    console.error("Ошибка при запросе списка жанров:", error);
    throw error;
  }
};


export const fetchMovies = async (currentPage: number = 1, limit: number = 50, selectedGenre: string = '', rating: string = '', year: string = '' ) => {
  let API_URL_QUERY = `?page=${currentPage}&limit=${limit}&type=movie`;
    
    if(rating) {
      API_URL_QUERY = API_URL_QUERY + '&rating.imdb='+ rating;
    }
    if(selectedGenre) {
      API_URL_QUERY = API_URL_QUERY + '&genres.name=' + encodeURI(selectedGenre);
    }
    if(year) {
      API_URL_QUERY = API_URL_QUERY + '&year=' + (year)
    }

  try {
    const response = await fetch(API_URL_BASE + API_URL_QUERY, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data as Movie [];
  } catch (error) {
    console.error(error);
  }
};


export const fetchMovieById = async (movieId: number) => {
  const API_URL_QUERY = `/${movieId}`;
  try {
    const response = await fetch(API_URL_BASE + API_URL_QUERY, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.status + " " + response.statusText);
    }
    return data as MovieDetailsType;
  } catch (error) {
    console.error(error);
  }
};
