import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Slider,
} from "@mui/material";
import { fetchGenres } from "../services/movieService";
import { Genre } from "../types";
import { MovieContext } from "../context/movieContext";

const FilterPanel: React.FC = () => {
  const { selectedGenre, setSelectedGenre, setRating, year, setYear } = useContext(MovieContext)!;
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);
  const [genresError, setGenresError] = useState<string | null>(null);
  const [ratingRange, setRatingRange] = useState([1, 10]);
  const currentYear = new Date().getFullYear();
  const [yearRange, setYearRange] = useState([1990, currentYear]);

  useEffect(() => {
    const fetchGenresData = async () => {
      try {
        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);
      } catch (err) {
        setGenresError("Error fetching genres");
        console.error(err);
      } finally {
        setIsLoadingGenres(false);
      }
    };
    fetchGenresData();
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value as string);
  };

  const handleRatingRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setRatingRange(newValue as [number, number]);
    const minRating = (newValue as number[])[0];
    const maxRating = (newValue as number[])[1];

    if (minRating === maxRating) {
      setRating(minRating.toString());
    } else {
      setRating(`${minRating}-${maxRating}`);
    }
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as [number, number]);
    const minYear = (newValue as number[])[0];
    const maxYear = (newValue as number[])[1];

    if (minYear === maxYear) {
      setYear(minYear.toString());
    } else {
      setYear(`${minYear}-${maxYear}`); 
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap", p: 2, justifyContent: "space-between" }}>
      <FormControl fullWidth>
        <InputLabel id="genre-label" sx={{fontWeight: 'bold'}}>Genre</InputLabel>
        {isLoadingGenres ? (
          <Typography>Loading genres...</Typography>
        ) : genresError ? (
          <Typography color="error">{genresError}</Typography>
        ) : (
          <Select
            labelId="genre-label"
            id="genre-select"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.slug} value={genre.name}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>

      <Box sx={{ width: 300 }}>
        <Typography id="rating-slider" gutterBottom>
          Rating ({ratingRange[0]} - {ratingRange[1]})
        </Typography>
        <Slider
          value={ratingRange}
          onChange={handleRatingRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={0.5}
        />
      </Box>

      <Box sx={{ width: 300 }}>
        <Typography id="year-slider" gutterBottom>
          Year ({yearRange[0]} - {yearRange[1]})
        </Typography>
        <Slider
          value={yearRange}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          min={1990} 
          max={currentYear}
        />
      </Box>

    </Box>
  );
};

export default FilterPanel;
