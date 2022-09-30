import { React, Fragment } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Entreno(props) {
  return (
    <Fragment>
      <br></br>
      <br></br>
      <Container>
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-primary">
            <img
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c4f7.png"
              width="10%"
              alt="play"
            ></img>
          </Button>
          <Button variant="outline-danger">
            <img
              src="https://cdn-icons-png.flaticon.com/512/26/26445.png"
              width="20%"
              alt="stop"
            ></img>
          </Button>
        </ButtonGroup>

        <Row>
          <Col>
            <br></br>
            <Card>
              <Card.Header>Ultimos registros</Card.Header>
              <Card.Body>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Numero de repeticiones: #</ListGroup.Item>
                    <ListGroup.Item>
                      Ultimo rango de movimiento: #
                    </ListGroup.Item>
                    <ListGroup.Item>Calorias quemadas: #</ListGroup.Item>
                    <ListGroup.Item>Frecuencia cardiaca: #</ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export { Entreno };
