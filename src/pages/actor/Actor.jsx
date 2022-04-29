import React from "react";
import { Layout, Button, Typography, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Sidebar from "../../components/sidebar/Sidebar";
import MovieCard from "../../components/movieCard/MovieCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "antd/dist/antd.min.css";
import "./actor.scss";
const Actor = () => {
  const { Header, Content } = Layout;
  const { Title } = Typography;
  const actorInfo = useSelector((state) => state.actor.actorInfo);

  return (
    <Layout className="outerContainer">
      <Layout className="innerContainer">
        <Header className="header" style={{ paddingLeft: "15px" }}>
          <Link to={"/"}>
            <Button type="primary" className="button">
              <ArrowLeftOutlined />
              <span>Regresar</span>
            </Button>
          </Link>
        </Header>
        <Layout className="main">
          <Sidebar />
          <Content className="content">
            <Title className="mainTitle">Peliculas:</Title>
            <Divider />
            {actorInfo?.known_for.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Actor;
