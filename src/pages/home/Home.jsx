import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchError } from "../../redux/actorSlice";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message, Layout, Typography, Button } from "antd";
import "antd/dist/antd.min.css";
import "./home.scss";

const Home = () => {
  const [actorName, setActorName] = useState("");
  const { Title, Text } = Typography;
  const { Dragger } = Upload;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const props = {
    name: "file",
    maxCount: 1, //Permite un solo archivo
    multiple: false,
    action: "https://whois.nomada.cloud/upload", //Fetch actors name
    headers: { Nomada: "MjMzZTRhODEtNjU0ZS00OWVlLWJjYTAtYTcyMThlNjk1NTU3" },
    style: { width: "800px", backgroundColor: "#F5F5F5", borderRadius: "5px" },
    height: "300px",
    beforeUpload: (file) => {
      //Validacion del archivo
      let isValid = true;
      const allowedFiles = /(.jpg|.JPG|.png|.PNG)$/i;
      if (!allowedFiles.exec(file.name)) {
        message.error(
          `${file.name} Archivo no valido porfavor cargue una imagen con formato: "JPG,jpg,PNG,png"`
        );
        isValid = false;
      }
      return isValid || Upload.LIST_IGNORE;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        if (info.file.response.actorName) {
          setActorName(info.file.response.actorName);
          message.success(`${info.file.name} Cargada con éxito.`);
        } else {
          console.log(info.file.response);
          message.error("Actor no encontrado pruebe con otra imagen.");
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  //Busca los datos del actor en themoviedb
  const handleFetch = async () => {
    dispatch(fetchStart());
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&language=en-US&page=1&include_adult=true&query=${actorName}`
      );
      dispatch(fetchSuccess(res.data.results[0]));
      navigate("/actor");
    } catch (error) {
      dispatch(fetchError());
      console.log(error);
    }
  };

  return (
    <Layout className="container">
      <Layout className="innerContainer">
        <Title>¿Quien es el actor?</Title>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: "70px" }} />
          </p>
          <Text style={{ fontSize: 24 }}>Haz click o arrastra una imagen</Text>
          <p className="ant-upload-hint">
            Selecciona la foto de un actor famoso para conocer quien es y en que
            películas ha salido
          </p>
        </Dragger>
        <Button
          className="button"
          type="primary"
          onClick={handleFetch}
          disabled={!actorName}
        >
          Buscar
        </Button>
      </Layout>
    </Layout>
  );
};

export default Home;
