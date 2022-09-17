import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Home from "./Home";

function Login() {
  const [loginL, setLogin] = useState(false);
  const [alertSession, setAlertSession] = useState(999);
  const [nombre, setNombre] = useState("");
  const [personaL, setPersona] = useState({});

  function iniciarSesion(e) {
    let requestPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreUsuario: nombre }),
    };
    const url = "https://api-ace2-p1.herokuapp.com/login";
    fetch(url, requestPost)
      .then((response) => response.json())
      .then((data) => {
        if (data.auth === false) {
          setAlertSession(0);
        } else {
          setPersona(data);
          setLogin(true);
        }
      })
      .catch((err) => console.log(err));
    // setPersona(persona);
    // setLogin(false);
  }

  return (
    <div>
      {loginL === false ? (
        <Container id="form_login">
          <Row>
            <Col></Col>
            <Col md="auto">
              <Container>
                <h1>WebApp - Boxeo</h1>
                <h1>Login</h1>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5495/5495893.png"
                  alt="logo"
                  height="45%"
                  width="45%"
                />
              </Container>
              {(() => {
                if (alertSession === 0) {
                  return (
                    <Alert variant="danger">¡El usuario no existe! :(</Alert>
                  );
                }
              })()}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese su nombre"
                  />
                </Form.Group>
                <Button variant="primary" type="button" onClick={iniciarSesion}>
                  Iniciar Sesión
                </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      ) : (
        <Home user={personaL} />
      )}
    </div>
  );
}

export default Login;
