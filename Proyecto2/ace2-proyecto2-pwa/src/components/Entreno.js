import React, { Fragment, useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { DetalleEntreno } from "./DetalleEntreno";

function change(val1, val2) {
  return val1 === val2;
}

function Entreno(props) {
  const [selectExrs, setExrs] = useState(0);
  const [data, setData] = useState({});
  const [counter, setCounter] = useState(0);

  const getData = async () => {
    if (counter === 0) {
      let name = 0;
      if (selectExrs === 1) {
        name = 1;
      } else if (selectExrs === 2) {
        name = 2;
      } else if (selectExrs === 3) {
        name = 3;
      }

      if (name !== 0) {
        let requestPost = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUsuario: props.idUsuario,
            idTipoEntreno: name,
          }),
        };
        //console.log(requestPost);
        const url = "https://api-ace2-proyec2.herokuapp.com/entreno";
        fetch(url, requestPost)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      }
    }
    // const url =
    //   "https://api-ace2-proyec2.herokuapp.com/datosSensor/idEntreno/" +
    //   props.idUsuario;
    // const response = await fetch(url);
    // const responseJSON = await response.json();
    setCounter(1 + 1);
    setData(2);
  };

  useEffect(() => {
    setTimeout(getData, 1000);
  });

  return (
    <Fragment>
      <h2>Elige un entrenamiento </h2>
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
            width="25%"
            alt="img"
            src="https://thumbs.dreamstime.com/b/jump-box-icon-line-color-vector-illustration-jump-box-icon-line-color-vector-illustration-white-background-239298775.jpg"
          ></img>
          {"    "}
          Jump Over
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
            width="33%"
            alt="img"
            src="https://www.webconsultas.com/sites/default/files/burpee_box_jump.jpg"
          ></img>
          Box Jump
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
            width="20%"
            alt="img"
            src="https://thumbs.dreamstime.com/b/basic-rgb-253709625.jpg"
          ></img>
          Step Up
        </ListGroup.Item>
      </ListGroup>
      <br></br>
      <br></br>
      <div>
        {/* <DetalleEntreno
          entreno={selectExrs}
          usuario={props.idUsuario}
          values={data}
        ></DetalleEntreno> */}
        <DetalleEntreno
          entreno={selectExrs}
          usuario={props.idUsuario}
          values={data}
        ></DetalleEntreno>
      </div>
    </Fragment>
  );
}

export { Entreno };
