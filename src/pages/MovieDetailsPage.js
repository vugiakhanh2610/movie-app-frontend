import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchAPI, fetcher } from "apiConfig/config";
import Loading from "components/loading/Loading";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(fetchAPI.getMovieDetail(movieId), fetcher);
  const loading = !data && !error;
  if (!data) return null;
  console.log(data);
  const { backdrop_path, poster_path, title, genre, overview } = data;

  return (
    <div className="page-container py-10">
      {loading && <Loading></Loading>}
      <div className="w-[90%] h-[550px] relative left-[50%] translate-x-[-50%]">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${fetchAPI.imageOriginal(poster_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={fetchAPI.imageOriginal(backdrop_path)}
          className="w-full h-full object-cover rounded-xl"
          alt=""
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {title}
      </h1>
      <div className="flex items-center justify-center gap-x-5 mb-10">
        {genre.split(",").map((item) => (
          <span
            className="py-2 px-4 border-primary text-primary border rounded"
            key={item.id}
          >
            {item}
          </span>
        ))}
      </div>

      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
    </div>
  );
};

export default MovieDetailsPage;
