import React from "react";
import useSWR from "swr";
import { fetchAPI, fetcher } from "apiConfig/config";
import Button from "components/button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const { data } = useSWR(fetchAPI.getMovieList(1), fetcher);
  if (!data) return null;
  const { title, backdropPath, id, genres } = data[0];

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={fetchAPI.imageOriginal(backdropPath)}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          {genres.length > 0 &&
            genres.map((item, index) => (
              <span
                key={index}
                className="py-2 px-4 border border-white rounded-md"
              >
                {item}
              </span>
            ))}
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </section>
  );
};

export default Banner;
