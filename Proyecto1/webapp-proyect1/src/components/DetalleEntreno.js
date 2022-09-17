import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function DetalleEntreno(props) {
  const EntrenoRitmo = () => {
    return (
      <>
        <ProgressBar
          variant="danger"
          animated
          now={props.values.porcentajeRitmo}
        />
        <h2>{props.values.porcentajeRitmo} %</h2>
      </>
    );
  };

  const EntrenoVelocidad = () => {
    return (
      <>
        <ProgressBar variant="success" animated now={props.values.velocidad} />
        <h2>{props.values.velocidad} golpe/minuto</h2>
      </>
    );
  };

  const EntrenoFuerza = () => {
    return (
      <>
        <ProgressBar
          variant="info"
          animated
          now={props.values.fuerzaGolpe}
          max="15"
          min="0"
        />
        <h2>{props.values.fuerzaGolpe} Kg</h2>
      </>
    );
  };

  if (props.entreno === 1) {
    return EntrenoRitmo();
  } else if (props.entreno === 2) {
    return EntrenoVelocidad();
  } else if (props.entreno === 3) {
    return EntrenoFuerza();
  }
}

export default DetalleEntreno;
