import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  IconButton,
} from "@mui/material";
import { Movie } from "../types";
import { Link } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useEffect, useState, useContext } from "react";

const MovieCard = ({ movie }: { movie: Movie }) => {

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setIsBookmarked(bookmarks.includes(movie.id));
  }, [movie.id]);

  const toggleBookmark = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const newBookmarks = isBookmarked
      ? bookmarks.filter((id: number) => id !== movie.id)
      : [...bookmarks, movie.id];
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  
  return (
    <Card className="card" sx={{
      width: 320,
      height: 400, 
      display: "flex",
      flexDirection: "column",
    }}>
      <IconButton
        onClick={(event) => toggleBookmark(event)}
        sx={{ position: "absolute", top: 8, right: 8, backgroundColor: "white", padding: 1,
          "&:hover": {
      backgroundColor: "#eef5fa",
    },
        }}
      >
        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      <Link className="card__link" to={`/movie/${movie.id}`}>
        {movie.poster?.url ? (
          <CardMedia
            component="img"
            sx={{
              objectFit: "cover",
            }}
            image={movie.poster.url}
            alt={movie.name ? movie.name : movie.alternativeName}
            />
          ) : (
            <div className="no-image__poster"></div>
          )}
      </Link>
      <CardContent className="card__content" sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            component="div"
            lineHeight="1"
            fontWeight={600}
          >
            { movie.name ? movie.name : movie.alternativeName }
          </Typography>
          <Typography marginY="2" variant="body2">
            {movie.year}
          </Typography>
        <Box>
          <Rating
            sx={{ fontSize: 16 }}
            name="imdb-rating"
            value={movie.rating.imdb}
            max={10}
            readOnly
            aria-label="Imdb rating"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
