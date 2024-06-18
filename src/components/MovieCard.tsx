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
    <Card className="card">
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
        {movie.poster ? (
          <CardMedia
            component="img"
            sx={{ objectFit: "contain"}}
            image={movie.poster.previewUrl}
            alt={movie.name}
          />
        ) : (
          <CardMedia />
        )}
      </Link>
      <CardContent className="card__content">
          <Typography
            variant="body1"
            component="div"
            lineHeight="1"
            fontWeight={600}
          >
            {movie.name}
          </Typography>
          <Typography marginY="2" variant="body2">
            {movie.year}
          </Typography>
        <Box>
          <Rating
            sx={{ fontSize: 16 }}
            name="kinopoisk-rating"
            value={movie.rating.kp}
            max={10}
            readOnly
            aria-label="Kinopoisk rating"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
