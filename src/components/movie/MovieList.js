import { fetchAPI, fetcher } from "apiConfig/config";
import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";

import MovieCard from "./MovieCard";

const MovieList = ({ categoryId }) => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(fetchAPI.getMovieList(categoryId), fetcher);

  useEffect(() => {
    data && setMovies(data);
  }, [data]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {movies &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard props={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
