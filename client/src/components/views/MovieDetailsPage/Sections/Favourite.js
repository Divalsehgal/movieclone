import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";

export default function Favourite(props) {
  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };
  const [favouriteNumber, setfavouriteNumber] = useState(0);

  const [favourited, setfavourited] = useState(false);
  useEffect(() => {
    axios.post(`/api/favourite/favoriteNumber`, variable).then((response) => {
      if (response.data.success) {
        setfavouriteNumber(response.data.favouriteNumber);
      } else {
        alert("Failed to get favourite Number  ");
      }
    });
    axios.post(`/api/favourite/favorited`, variable).then((response) => {
      if (response.data.success) {
        setfavourited(response.data.favourited);
      } else {
        alert("Failed to get favourite Info ");
      }
    });
  }, []);
  const onClickFavourite = () => {
    if (favourited) {
      axios.post(`/api/favourite/removeFromFavorite`, variable)
        .then((response) => {
          if (response.data.success) {
            setfavouriteNumber(favouriteNumber - 1);
            setfavourited(!favourited);
          } else {
            alert("Failed to remove from favorites");
          }
        });
    } else {
      axios.post(`/api/favourite/addToFavorite`, variable)
      .then((response) => {
        if (response.data.success) {
          setfavouriteNumber(favouriteNumber + 1);
          setfavourited(!favourited);
        } else {
          alert("Failed to add to favorites");
        }
      });
    }
  };
  return (
    <div>
      <Button onClick={onClickFavourite}>
        {favourited ? "remove from favourites" : "Add to favourite"}{" "}
        {favouriteNumber}
      </Button>
    </div>
  );
}
