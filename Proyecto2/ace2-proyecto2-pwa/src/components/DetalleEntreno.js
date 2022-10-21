import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function DetalleEntreno(props) {
  const EntrenoJumpOver = () => {
    return (
      <div>
        <h2>Entreno JumpOver</h2>
        <h3>Peso</h3>
        <ProgressBar variant="sucess" animated now="450" />
        <h2>Peso lb.</h2>
        <br></br>
        <h3>Fuerza Inicial</h3>
        <ProgressBar variant="info" animated now="450" />
        <h2>fuerza_inicial N.</h2>
        <br></br>
        <h3>Fuerza Llegada</h3>
        <ProgressBar variant="warning" animated now="450" />
        <h2>fuerza_llegada N.</h2>
        <br></br>
        <h3>Calorias quemadas</h3>
        <ProgressBar variant="danger" animated now="450" />
        <h2> # calorias.</h2>
        <br></br>
      </div>
    );
  };

  const EntrenoBoxJump = () => {
    return (
      <div>
        <h2>EntrenoBoxJump</h2>
        <h3>Peso</h3>
        <ProgressBar variant="sucess" animated now="450" />
        <h2>Peso lb.</h2>
        <br></br>
        <h3>Fuerza Inicial</h3>
        <ProgressBar variant="info" animated now="450" />
        <h2>fuerza_inicial N.</h2>
        <br></br>
        <h3>Fuerza Llegada</h3>
        <ProgressBar variant="warning" animated now="450" />
        <h2>fuerza_llegada N.</h2>
        <br></br>
        <h3>Calorias quemadas</h3>
        <ProgressBar variant="danger" animated now="450" />
        <h2> # calorias..</h2>
        <br></br>
      </div>
    );
  };

  const EntrenoStepUp = () => {
    return (
      <div>
        <h2>Entreno StepUp</h2>
        <h3>Peso</h3>
        <ProgressBar variant="sucess" animated now="450" />
        <h2>Peso lb.</h2>
        <br></br>
        <h3>Fuerza Inicial</h3>
        <ProgressBar variant="info" animated now="450" />
        <h2>fuerza_inicial N.</h2>
        <br></br>
        <h3>Fuerza Llegada</h3>
        <ProgressBar variant="warning" animated now="450" />
        <h2>fuerza_llegada N.</h2>
        <br></br>
        <h3>Calorias quemadas</h3>
        <ProgressBar variant="danger" animated now="450" />
        <h2># calorias</h2>
        <br></br>
      </div>
    );
  };

  if (props.entreno === 1) {
    return EntrenoJumpOver();
  } else if (props.entreno === 2) {
    return EntrenoBoxJump();
  } else if (props.entreno === 3) {
    return EntrenoStepUp();
  }
}

export { DetalleEntreno };
