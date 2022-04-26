import React from "react";
import { Layout, Typography, Divider, Image } from "antd";
import "./movieCard.scss";
import "antd/dist/antd.min.css";
import { StarFilled } from "@ant-design/icons";
const MovieCard = ({ movie }) => {
  const { Title, Text } = Typography;
  const { Content } = Layout;
  const img = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;

  return (
    <Layout className="layout">
      <Content className="top">
        <Title className="title">{movie.title}</Title>
        <div className="rating">
          <span>{movie.vote_average}/10</span>
          <StarFilled className="icon" />
        </div>
      </Content>
      <Content className="bottom">
        <Image preview={false} width={120} src={img} />
        <div className="desc">
          <Text>{movie.overview}</Text>
          <br />
          <br />
          <Text style={{ fontWeight: "500" }}>
            Fecha de estreno: {movie.release_date}
          </Text>
        </div>
      </Content>
      <Divider />
    </Layout>
  );
};

export default MovieCard;
