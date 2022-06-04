import { fetchAPI, fetcher } from "apiConfig/config";
import Banner from "components/banner/Banner";
import Loading from "components/loading/Loading";
import React from "react";
import useSWR from "swr";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  const { data, error } = useSWR(fetchAPI.getCategoryList, fetcher);
  const loading = !data && !error;
  if (!data) return null;

  return (
    <>
      {loading && <Loading></Loading>}
      <Banner></Banner>
      {data &&
        data.map((item) => (
          <section key={item.id} className="movies-layout page-container pb-20">
            <h2 className="mb-10 text-3xl font-bold">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </h2>
            <MovieList categoryId={item.id}></MovieList>
          </section>
        ))}
    </>
  );
};

export default HomePage;
