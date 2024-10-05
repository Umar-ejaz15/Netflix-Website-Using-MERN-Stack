import React, { useState } from "react";
import Header from "./Header";

const Home = () => {
  return (
    <div className="flex w-full min-h-screen bg-zinc-900 flex-col">
      <Header />

      <section className="w-full h-auto p-4">
        <div className="bg-zinc-800 rounded-lg shadow-lg p-6 h-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Movie Information
          </h2>
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-40 h-30 md:w-1/4 pr-0 md:pr-4 mb-4 md:mb-0">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpZ1hZgTUaG9CmZwrEarK0vNniFCpaJ6k_2A&s"
                alt="Movie Poster"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-3/4 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Name:</h3>
                <p className="text-gray-300">Movie Title</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Description:
                </h3>
                <p className="text-gray-300">
                  Movie description goes here. This can be a longer text
                  describing the plot, characters, and other relevant
                  information about the movie.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                    Action
                  </span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                    Adventure
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    Sci-Fi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
