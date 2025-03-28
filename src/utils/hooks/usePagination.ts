import { useState } from "react";
import { useSelector } from "react-redux";
import { selectMovies } from "@store/moviesSlice";
import { Movie } from "@utils/types/types";

export const usePagination = (moviesPerPage: number = 6) => {
  const movies = useSelector(selectMovies) as Movie[];
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const nextPage = () => {
    if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return { currentMovies, currentPage, nextPage, prevPage };
};
