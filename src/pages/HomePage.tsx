// src/pages/HomePage.tsx
import React, { useContext, useEffect } from "react";
import {
  Grid,
  Pagination,
  Stack,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/movieContext";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    movies,
    isLoading,
    totalPages,
    currentPage,
    fetchMovies,
    setCurrentPage,
    setMovies,
    setTotalPages,
    setLimit,
  } = useContext(MovieContext)!;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // fetchMovies(value);
    setCurrentPage(value);
  };

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(currentPage);
        setMovies(data.docs)
        setTotalPages(data.pages)
        setLimit(data.limit)
        console.log(data)
    }
    getMovies()
  }, [currentPage]);


  return (
    <section>
      <Box>
        <Typography variant="h2" textAlign="center">
          {isLoading ? (
            <Skeleton width={400} sx={{ marginX: "auto" }} />
          ) : (
            "Кинопоиск"
          )}
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 3, lg: 3 }}
        columns={{ xs: 3, sm: 4, md: 9, lg: 12 }}
        sx={{ py: 8, alignItems: "center", justifyContent: "center" }}
      >
        {isLoading
          ? Array.from(new Array(50)).map((_, index) => (
              <Grid item columns={{ xs: 3, sm: 4, md: 9, lg: 12 }} key={index}>
                <Skeleton variant="rectangular" width={300} height={400} />
              </Grid>
            ))
          : movies.map((movie) => (
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
            ))}
      </Grid>

      {!isLoading && (
        <Box paddingY={8} display="flex" justifyContent="center">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Stack>
        </Box>
      )}
    </section>
  );
};

export default HomePage;
