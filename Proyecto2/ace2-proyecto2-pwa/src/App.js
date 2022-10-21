import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import { Login } from "./components/Login";
import "./App.css";

function App() {
  const [login, setLogin] = useState(999);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [genero, setGenero] = useState("");
  const [iniciar, setIniciar] = useState(false);

  function iniciarSesion(e) {
    e.preventDefault();

    let p = {
      nombreUsuario: nombre,
      password: password,
      edad: edad,
      peso: peso,
      estatura: altura,
      genero: genero,
    };
    setLogin(1);
    console.log(p);
    let requestPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    };

    const url = "https://api-ace2-proyec2.herokuapp.com/usuario";

    fetch(url, requestPost)
      .then((response) => response.json())
      .then((data) => setLogin(1))
      .catch((err) => setLogin(0));

    document.getElementById("nombre").value = "";
    document.getElementById("password").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("edad").value = "";
  }

  return (
    <div>
      {iniciar === true ? (
        <Login></Login>
      ) : (
        // <Home></Home>
        //
        <Container id="form_login">
          {" "}
          <Row>
            <Col></Col>
            <Col md="auto">
              <Container align="center">
                <h1>WebApp - Box Jump Burpees</h1>
                <h3>Registro</h3>
                <img
                  src="https://movemoresitless.files.wordpress.com/2013/03/screen-shot-2013-03-23-at-7-02-06-pm.png"
                  alt="logo"
                  height="50%"
                  width="50%"
                />
              </Container>
              {(() => {
                if (login === 1) {
                  return (
                    <Alert variant="success">
                      ¡El usuario se ha creado con exito! :D
                    </Alert>
                  );
                } else if (login === 0) {
                  return (
                    <Alert variant="danger">
                      ¡Error, hubo un problema al crear el usuario! :(
                    </Alert>
                  );
                } else {
                  return <p></p>;
                }
              })()}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    id="nombre"
                    type="text"
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese su nombre"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Col>
                    <Form.Control
                      id="password"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    id="edad"
                    type="any"
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Ingrese su edad"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Peso</Form.Label>
                  <Form.Control
                    id="peso"
                    type="any"
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ingrese su peso"
                    required="Campo obligatorio"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Altura</Form.Label>
                  <Form.Control
                    id="altura"
                    type="any"
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="Ingrese su altura"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <Form.Select onChange={(e) => setGenero(e.target.value)}>
                    <option>Opciones</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="button" onClick={iniciarSesion}>
                  Registrarse
                </Button>
                <br></br>
                <br></br>
                <Button
                  variant="success"
                  type="button"
                  onClick={() => setIniciar(true)}
                >
                  Login{" "}
                </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;
