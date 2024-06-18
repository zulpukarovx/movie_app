import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import { MovieProvider } from "./context/movieContext";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <Router>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="movie/:id" element={<MovieDetails />} />
          </Route>
        </Routes>
      </MovieProvider>
    </Router>
  );
};

export default App;
