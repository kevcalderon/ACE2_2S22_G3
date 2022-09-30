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
                <Card.Img
                  variant="top"
                  src="https://media.istockphoto.com/vectors/profile-icon-male-emotion-avatar-man-cartoon-portrait-shocked-face-vector-id693553986?b=1&k=6&m=693553986&s=170667a&w=0&h=DTEMJvCPNRTrsk99vRoyF1AuSd3uVtlaUdw09u1gkq4="
                  width="30%"
                  height="30%"
                />
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
                  Ejercicio de flexiones
                </Button>
                <Button variant="success" size="lg" onClick={() => setVista(2)}>
                  Reportes
                </Button>
              </ButtonGroup>
              <Fragment>
                {vista === 1 ? <Entreno></Entreno> : <Reportes></Reportes>}
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
