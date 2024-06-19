export interface Movie {
  id: number;
  name: string;
  alternativeName: string | null;
  type: string;
  typeNumber: number;
  year: number;
  description: string | null;
  shortDescription: string | null;
  status: string | null;
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  votes: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  movieLength: number | null;
  totalSeriesLength: number | null;
  seriesLength: number | null;
  ratingMpaa: string | null;
  ageRating: number | null;
  poster: {
    url: string;
    previewUrl: string;
  };
  genres: { name: string }[];
  countries: { name: string }[];
  releaseYears: { start: number; end: number | null }[];
  top10: number | null;
  top250: number | null;
  isSeries: boolean;
  ticketsOnSale: boolean;
  pages: number;
}

export interface MovieDetailsType {
  name: string;
  year: number;
  countries: { name: string }[];
  genres: { name: string }[];
  ageRating: string;
  rating: {
    kp: number;
    imdb: number;
  };
  poster: {
    url: string;
  };
  description: string;
}

export interface Genre {
  name: string;
  slug: string;
}