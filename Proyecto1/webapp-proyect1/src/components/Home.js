import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import App from "../App";
import Entreno from "./Entreno";
import Reporte from "./Reporte";

function Home(props) {
  const [cerrarLogin, setCerrarLogin] = useState(true);
  const [vista, setVista] = useState(0);

  function cerrarSesion() {
    setCerrarLogin(false);
  }

  return (
    <div>
      {cerrarLogin ? (
        <Container>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Button variant="danger" type="button" onClick={cerrarSesion}>
                    Cerrar Sesión
                  </Button>
                  <br></br>
                  <br></br>
                  <img
                    height="35%"
                    width="55%"
                    alt="img"
                    src="https://cdn-icons-png.flaticon.com/512/928/928657.png"
                  ></img>
                  <Card.Title>Datos personales</Card.Title>
                  <Card.Text>
                    <div>
                      <h5>Bienvenido: {props.user.nombreUsuario}</h5>
                      <h5>Edad: {props.user.edad} años</h5>
                      <h5>Altura: {props.user.estatura} m.</h5>
                      <h5>Peso: {props.user.peso} lb.</h5>
                      <h5>Género: {props.user.genero} lb.</h5>
                    </div>
                    <br></br>
                    <br></br>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <br></br>
              <Button variant="info" type="button" onClick={() => setVista(1)}>
                Entreno
              </Button>
              <Button
                variant="success"
                type="button"
                onClick={() => setVista(2)}
              >
                Reportes
              </Button>
              <div>
                {vista === 1 ? (
                  <Entreno idUsuario={props.user.idUsuario}></Entreno>
                ) : (
                  <Reporte idUsuario={props.user.idUsuario}></Reporte>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <App></App>
      )}
    </div>
  );
}

export default Home;
