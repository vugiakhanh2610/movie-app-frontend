import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { fetchAPI, fetcher } from "apiConfig/config";
import useDebounce from "hooks/useDebounce";
import MovieCard from "components/movie/MovieCard";
import Loading from "components/loading/Loading";

const MoviePage = () => {
  // Fetch API
  const [url, setUrl] = useState(fetchAPI.getMovieList(""));
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  const movies = data?.movies || [];
  const totalPages = data?.totalPages;

  // Pagination feature
  const [page, setPage] = useState(0);

  // Search feature
  const [filter, setFilter] = useState("");
  const debounceFilter = useDebounce(filter, 500);
  const handleOnChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (debounceFilter) {
      setUrl(fetchAPI.searchMovie(debounceFilter));
    } else {
      setUrl(fetchAPI.getMovieList("", page));
    }
  }, [debounceFilter, page]);

  return (
    <div className="page-container py-10">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            onChange={handleOnChange}
            type="text"
            className="w-full p-2 outline-none bg-slate-800 text-white"
          />
        </div>
        <button className="p-2 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {loading && <Loading></Loading>}

      <div className="grid grid-cols-4 gap-10">
        {movies &&
          movies.map((item) => (
            <MovieCard key={item.id} props={item}></MovieCard>
          ))}
      </div>

      {/* Pagination */}
      {totalPages !== 1 && (
        <div className="pagination">
          {page !== 0 && (
            <span onClick={() => setPage(page - 1)} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
          )}

          {new Array(totalPages).fill(0).map((item, index) => (
            <span
              onClick={() => setPage(index)}
              className={index === page ? "selected" : "cursor-pointer"}
            >
              {index + 1}
            </span>
          ))}
          {page !== totalPages - 1 && (
            <span onClick={() => setPage(page + 1)} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          )}
        </div>
      )}
      {/* Pagination */}
    </div>
  );
};

export default MoviePage;
