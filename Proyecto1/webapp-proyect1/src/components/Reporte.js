//import Button from "react-bootstrap/Button";
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Dashboard from './Dashboard';
import DashboardGraficas from './DashboardGraficas';


function Reporte(props) {
  const [vista, setVista] = useState(1); // 1: Dashboard, 2: DashboardGraficas
  return (
    <>
    <br></br>
    <Button
      variant="warning" type="button" onClick={() => setVista(1)}>
      Dashboard
    </Button>
    <Button
      variant="warning" type="button" onClick={() => setVista(2)}>
      Gráficas
    </Button>
    <br></br>
    <div><br></br></div>
    <div>
      {vista === 1 ? (
      <Dashboard idUsuario={props.idUsuario}></Dashboard>
      ) : (
      <DashboardGraficas idUsuario={props.idUsuario}></DashboardGraficas>                  
      )}
    </div>
    </>
  );
}

export default Reporte;
