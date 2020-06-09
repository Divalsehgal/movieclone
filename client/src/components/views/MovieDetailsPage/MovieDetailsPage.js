import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Descriptions, Button, Row } from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favourite from "../MovieDetailsPage/Sections/Favourite";
import axios from "axios"
export default function MovieDetailsPage(props) {
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const movieId = props.match.params.moviesId;
    console.log(movieId);
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setCrews(response.cast);
          });
      });
  }, []);
  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };
  return (
    <div>
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
     {localStorage.getItem('userId') &&  <Favourite
       userFrom={localStorage.getItem('userId')}
     movieInfo={Movie}
        movieId ={props.match.params.moviesId}/>}
        </div>
        {Movie && (
          <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="Title">
              {Movie.original_title}
            </Descriptions.Item>
            <Descriptions.Item label="Release_Date">
              {Movie.release_date}
            </Descriptions.Item>{" "}
            <Descriptions.Item label="Revenue">
              {Movie.revenue}
            </Descriptions.Item>{" "}
            <Descriptions.Item label="Run_Time">
              {Movie.runtime}
            </Descriptions.Item>{" "}
            <Descriptions.Item label="Vote_Average">
              {Movie.vote_average}
            </Descriptions.Item>{" "}
            <Descriptions.Item label="Vote_Count">
              {Movie.vote_count}
            </Descriptions.Item>{" "}
            <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>{" "}
            <Descriptions.Item label="Popularity">
              {Movie.popularity}
            </Descriptions.Item>{" "}
          </Descriptions>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem",
          }}
        >
          <Button onClick={handleClick}>Toggle Actor View</Button>
        </div>
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Crews &&
              Crews.map((crews, index) => (
                <React.Fragment key={index}>
                  {crews.profile_path && (
                    <GridCard
                      actor
                      image={`${IMAGE_URL}w500${crews.profile_path}`}
                    />
                  )}{" "}
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}
