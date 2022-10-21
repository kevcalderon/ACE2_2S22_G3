import { React, Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Entreno } from "./Entreno";
import { Reportes } from "./Reportes";
import App from "../App";

function Home(props) {
  const [cerrarLogin, setCerrarLogin] = useState(true);
  const [vista, setVista] = useState(0);

  function cerrarSesion() {
    setCerrarLogin(false);
  }
  return (
    <Fragment>
      <br></br>
      {cerrarLogin ? (
        <Container>
          <Row>
            {/* CARTA DE INFOR DE PERSONA */}
            <Col md="auto">
              <Card style={{ width: "18rem" }}>
                {props.user.genero === "M" ? (
                  <Card.Img
                    variant="top"
                    src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1"
                    width="10%"
                    height="10%"
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src="https://cashly.pro/assets/avatars/woman%20(3).png"
                    width="5%"
                    height="5%"
                  />
                )}

                <Card.Body>
                  <Card.Title>Nombre de perfil</Card.Title>
                  <Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Nombre usuario: {props.user.nombreUsuario}
                      </ListGroup.Item>
                      <ListGroup.Item>Edad: {props.user.edad}</ListGroup.Item>
                      <ListGroup.Item>Peso: {props.user.peso}</ListGroup.Item>
                      <ListGroup.Item>
                        Altura: {props.user.estatura}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Género: {props.user.genero}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Fecha/hora actual: {props.user.fechaHora}
                      </ListGroup.Item>
                    </ListGroup>
                    <Button variant="danger" onClick={cerrarSesion}>
                      Cerrar Sesión
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* INFORMACIÓN DE FLEXIONES Y REPORTES */}
            <Col>
              <ButtonGroup aria-label="Basic example">
                <Button variant="info" size="lg" onClick={() => setVista(1)}>
                  Entrenamientos
                </Button>
                <Button variant="success" size="lg" onClick={() => setVista(2)}>
                  Reportes
                </Button>
              </ButtonGroup>
              <Fragment>
                {vista === 1 ? (
                  <Entreno idUsuario={props.user.idUsuario}></Entreno>
                ) : (
                  //   <Entreno idUsuario={props.user.idUsuario}></Entreno>
                  <Reportes idUsuario={props.user.idUsuario}></Reportes>
                )}
              </Fragment>
            </Col>
          </Row>
        </Container>
      ) : (
        <App></App>
      )}
    </Fragment>
  );
}

export { Home };
