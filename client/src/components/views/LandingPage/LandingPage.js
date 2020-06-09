import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import { Typography, Row } from "antd";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";
const Title = Typography;
function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage,SetCurrentPage]=useState(0)

  useEffect(() => {

const endPoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
fetchMovies(endPoint)
  }, []);

  const fetchMovies=(endPoint)=>{
    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
     //   setMovies([...Movies.concat(response.results)]);
        setMovies([...Movies,...response.results]);

      });
  }
  const handleClick=()=>{

    const endPoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`
    fetchMovies(endPoint)
  }
  return (
    <div style={{ width: "100%", margin: "0" }}>
      {Movies[0] && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`}
          title={`${Movies[0].original_title}`}
          text={`${Movies[0].overview}`}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title level={2}>Movies By latest</Title>
        <hr />

        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movies, index) => <React.Fragment key={index}>
                <GridCard
                image={movies.poster_path && `${IMAGE_URL}w500${movies.poster_path}`}
                movieId={movies.id}
                />
            </React.Fragment>)}
        </Row>
        <hr />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleClick}>Load More</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
