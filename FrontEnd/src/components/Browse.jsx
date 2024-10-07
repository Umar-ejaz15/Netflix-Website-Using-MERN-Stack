import React, { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { Now_Playing_Movie } from "../utils/apiCall";
import { options } from "../utils/apiCall";

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const useNowPlayingMovies = async () => {
    try {
      const response = await axios.get(Now_Playing_Movie, options);
      console.log(response.data.results);
      dispatch(getNowPlayingMovies(response.data.results));
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/home");
    }
    useNowPlayingMovies();
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-zinc-900 flex-col">
      <Header />

      <section className="w-full h-auto p-4">
        <div className="bg-zinc-800 rounded-lg shadow-lg p-6 h-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Now Playing Movies
          </h2>
          <p className="text-white">No movies to display.</p>
        </div>
      </section>
    </div>
  );
};

export default Browse;
