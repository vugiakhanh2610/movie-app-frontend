import { fetchAPI } from "apiConfig/config";
import React from "react";
import { useNavigate } from "react-router";
import Button from "../button/Button";

const MovieCard = ({ props }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card p-3 bg-slate-800 rounded-lg select-none">
      <img
        src={fetchAPI.image500(props.posterPath)}
        alt=""
        className="w-full h-[200px] object-cover rounded-lg mb-5"
      />
      <h3 className="text-white text-lg font-medium mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
        {props.title}
      </h3>
      <div className="flex items-center justify-between text-white text-sm opacity-50 mb-10">
        <span>{props.date}</span>
        <span>{props.vote}</span>
      </div>
      <Button onClick={() => navigate(`/movie/${props.id}`)} full>
        Watch Now
      </Button>
    </div>
  );
};

export default MovieCard;
