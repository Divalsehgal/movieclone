import React from "react";
import { Col } from "antd";
export default function GridCard(props) {
  if (props.actor) {
    return (
      <div>
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: "relative" }}>
            {props.image && (
              <img
                style={{ width: "100%", height: "320px" }}
                alt="image"
                src={props.image}
              />
            )}
          </div>
        </Col>
      </div>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              alt="image"
              src={props.image}
            />
          </a>
        </div>
      </Col>
    );
  }
}
