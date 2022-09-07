import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Principal from "./components/Principal";
import "./App.css";

function App() {
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  const [login, setLogin] = useState("false");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  function iniciarSesion(e) {
    e.preventDefault();
    document.getElementById("form_login").style.display = "None";
    setLogin("true");
  }

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }
  return (
    <div>
      {isReadyForInstall && (
        <Button variant="success" onClick={downloadApp}>
          {" "}
          Descargar PWA
        </Button>
      )}
      <Container id="form_login">
        <Row>
          <Col></Col>
          <Col md="auto">
            <Container>
              <h1>WebApp - Boxeo</h1>
              <img
                src="https://cdn-icons-png.flaticon.com/512/5495/5495893.png"
                alt="logo"
                height="45%"
                width="45%"
              />
            </Container>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingrese su nombre"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="any"
                  onChange={(e) => setEdad(e.target.value)}
                  placeholder="Ingrese su edad"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Peso</Form.Label>
                <Form.Control
                  type="any"
                  onChange={(e) => setPeso(e.target.value)}
                  placeholder="Ingrese su peso"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Altura</Form.Label>
                <Form.Control
                  type="any"
                  onChange={(e) => setAltura(e.target.value)}
                  placeholder="Ingrese su altura"
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={iniciarSesion}>
                Login
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      {login === "true" && (
        <Principal nombre={nombre} edad={edad} altura={altura} peso={peso} />
      )}
    </div>
  );
}

export default App;
