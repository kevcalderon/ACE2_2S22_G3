import { React, Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Home } from "./Home";

function Login() {
  const [loginL, setLogin] = useState(false);
  const [alertSession, setAlertSession] = useState(999);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [personaL, setPersona] = useState({});

  function iniciarSesion() {
    let requestPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreUsuario: nombre, password: password }),
    };
    console.log(requestPost);

    const url = "https://api-ace2-proyec2.herokuapp.com/login";
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
  }

  return (
    <Fragment>
      {loginL === false ? (
        <Container id="form_login">
          <Row>
            <Col></Col>
            <Col md="auto">
              <Container align="center">
                <h1>WebApp - Box Jump Burpees</h1>
                <h3>Login</h3>
                <img
                  src="https://blush.design/api/download?shareUri=IQ5Cyxro8FdNRz1C&c=Skin_0%7Eff9ba5-0.1%7Eb17606&w=800&h=800&fm=png"
                  alt="logo"
                  height="40%"
                  width="40%"
                />
              </Container>
              {(() => {
                if (alertSession === 0) {
                  return (
                    <Alert variant="danger">
                      ¡El usuario y/o contraseña es incorrecta! :(
                    </Alert>
                  );
                }
              })()}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese su nickname"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su password"
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
    </Fragment>
  );
}

export { Login };
