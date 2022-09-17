import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import DetalleEntreno from "./DetalleEntreno";

function change(val1, val2) {
  return val1 === val2;
}

function Entreno(props) {
  const [selectExrs, setExrs] = useState(0);
  const [data, setData] = useState({});
  const [counter, setCounter] = useState(0);

  const getData = async () => {
    if (counter === 0) {
      let name = "";
      if (selectExrs === 1) {
        name = "ritmo";
      } else if (selectExrs === 2) {
        name = "velocidad";
      } else if (selectExrs === 3) {
        name = "fuerza";
      }

      if (name !== "") {
        let requestPost = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idUsuario: props.idUsuario, nombre: name }),
        };
        const url = "https://api-ace2-p1.herokuapp.com/entreno";
        fetch(url, requestPost)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      }
    }
    const url =
      "https://api-ace2-p1.herokuapp.com/datosSensor/idUsuario/" +
      props.idUsuario;
    const response = await fetch(url);
    const responseJSON = await response.json();
    setCounter(counter + 1);
    setData(responseJSON);
  };

  useEffect(() => {
    setTimeout(getData, 1000);
  });

  return (
    <div>
      <h2>Elige un ejercicio </h2>
      <ListGroup>
        <ListGroup.Item
          action
          onClick={() => {
            setExrs(1);
            if (!change(selectExrs, 1)) {
              setCounter(0);
            }
          }}
          variant="success"
        >
          <img
            height="100%"
            width="20%"
            alt="img"
            src="https://w7.pngwing.com/pngs/545/216/png-transparent-computer-icons-speed-speed-miscellaneous-text-logo.png"
          ></img>
          Ritmo
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => {
            setExrs(2);
            if (!change(selectExrs, 2)) {
              setCounter(0);
            }
          }}
          variant="danger"
        >
          <img
            height="100%"
            width="10%"
            alt="img"
            src="https://cdn-icons-png.flaticon.com/512/84/84570.png"
          ></img>
          Velocidad
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => {
            setExrs(3);
            if (!change(selectExrs, 3)) {
              setCounter(0);
            }
          }}
          variant="warning"
        >
          <img
            height="100%"
            width="10%"
            alt="img"
            src="https://w7.pngwing.com/pngs/698/556/png-transparent-logo-physical-strength-strength-training-computer-icons-strength-miscellaneous-hand-monochrome-thumbnail.png"
          ></img>
          Fuerza
        </ListGroup.Item>
      </ListGroup>
      <br></br>
      <br></br>
      <div>
        <DetalleEntreno
          entreno={selectExrs}
          usuario={props.idUsuario}
          values={data}
        ></DetalleEntreno>
      </div>
    </div>
  );
}

export default Entreno;
