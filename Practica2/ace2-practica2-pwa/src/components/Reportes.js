import { useState } from 'react';
import Button  from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DashboardResumen from './DashboardResumen';
import DashboardGraficas from './DashboardGraficas';

function Reportes(props) {
  const [vista, setVista] = useState(1); // 1: DashboardResumen, 2: DashboardGraficas
  return (
    <>
    <br></br>
    <br></br>
    <ButtonGroup aria-label="Basic example">
      <Button
        variant="secondary" type="button" onClick={() => setVista(1)}>
        Dashboard
      </Button>
      <Button
        variant="secondary" type="button" onClick={() => setVista(2)}>
        Gráficas
      </Button>
    </ButtonGroup>
    
    <br></br>
    <div><br></br></div>
    <div>
      {vista === 1 ? (
      <DashboardResumen idUsuario={props.idUsuario}></DashboardResumen>
      ) : (
      <DashboardGraficas idUsuario={props.idUsuario}></DashboardGraficas>                  
      )}
    </div>
    </>
  );
}

export {Reportes};
