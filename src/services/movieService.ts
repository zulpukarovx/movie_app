// https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=50&query=Game%20of%20thrones"
const API_URL_BASE = "https://api.kinopoisk.dev/v1.4/movie";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (currentPage: number = 1, limit: number = 50, genres: string = 'драма', rating: string[] ): Promise<T> => {
  let API_URL_QUERY = `?page=${currentPage}&limit=${limit}&selectFields=id&selectFields=name&selectFields=description&selectFields=year&selectFields=rating&selectFields=genres&selectFields=poster&selectFields=top250&notNullFields=id&notNullFields=name&notNullFields=description&notNullFields=year&notNullFields=rating.kp&notNullFields=genres.name&notNullFields=poster.url&notNullFields=top250&type=movie`;

    if(genres) {
      console.log(genres)
      API_URL_QUERY = API_URL_QUERY + '&genres.name=' + encodeURI(genres);
    } 
    if(rating) {
      API_URL_QUERY = API_URL_QUERY + '&rating.kp='+ rating[0];
    }
    console.log(API_URL_QUERY)
    // "?page=4&limit=50&selectFields=id&selectFields=name&selectFields=description&selectFields=year&selectFields=rating&selectFields=genres&selectFields=poster&selectFields=top250&notNullFields=id&notNullFields=name&notNullFields=description&notNullFields=year&notNullFields=rating.kp&notNullFields=genres.name&notNullFields=poster.url&notNullFields=top250&type=movie";
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
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieById = async (movieId: number): Promise<T> => {
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
    return data;
  } catch (error) {
    console.error(error);
  }
};
