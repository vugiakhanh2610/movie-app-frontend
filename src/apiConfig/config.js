import axios from "axios";
export const fetcher = (url) => axios.get(url).then((res) => res.data);

const endpoint = "http://localhost:8080/api/v1";
export const fetchAPI = {
  getMovieList: (categoryId, page = 0, size = 16) =>
    `${endpoint}/movies/${categoryId}?page=${page}&size=${size}`,
  getMovieDetail: (movieId) => `${endpoint}/movie/${movieId}`,
  getCategoryList: `${endpoint}/categories`,
  searchMovie: (keyword) => `${endpoint}/movies/search/?query=${keyword}`,

  imageOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
