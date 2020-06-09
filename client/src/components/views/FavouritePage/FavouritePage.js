import React, { useEffect, useState } from "react";
import "./favourite.css";
import axios from "axios";
import { Popover } from "antd";
import { IMAGE_URL } from "../../Config";
function FavouritePage() {
  const [FavouriteMovies, setFavouriteMovies] = useState();
  useEffect(() => {
    fetchFavouriteMovie();
  }, []);

  const fetchFavouriteMovie = () => {
    const variables = {
      userFrom: localStorage.getItem("userId"),
    };
    axios
      .post(`/api/favourite/getFavouriteMovie`, variables)
      .then((response) => {
        if (response.data.success) {
          setFavouriteMovies(response.data.favourites);
        } else {
          alert("failed to get favourite movies");
        }
      });
  };
  const renderTablebody =
    FavouriteMovies &&
    FavouriteMovies.map((movie, index) => {
      const content = (
        <div>
          {movie.movieImage ? (
            <img src={`${IMAGE_URL}w500${movie.movieImage}`} />
          ) : (
            "No Image"
          )}
        </div>
      );

      const onClickRemove = (movieId) => {
        const variable = {
          movieId: movieId,
          userFrom: localStorage.getItem("userId"),
        };
        axios
          .post(`/api/favourite/removeFromFavorite`, variable)
          .then((response) => {
            if (response.data.success) {
              fetchFavouriteMovie();

            } else {
              alert("Failed to remove from favorites");
            }
          });
      };

      return (
        <tr key={index}>
          <Popover content={content} title={`${movie.movieTitle}`}>
            <td>{movie.movieTitle}</td>
          </Popover>
          <td>{movie.movieRunTime}</td>
          <td>
            <button onClick={() => onClickRemove(movie.movieId)}>
              Remove from the favourites
            </button>
          </td>
        </tr>
      );
    });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h3>Favourites movies by me</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th> Movie RunTime</th>
            <th> Remove from Favourites</th>
          </tr>
        </thead>
        <tbody>{renderTablebody}</tbody>{" "}
      </table>
    </div>
  );
}

export default FavouritePage;
