import React from 'react';
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Grafica from './Grafica';

export default function DashboardGraficas(props) {
    const calcularLunes = (diaHoy) => {
        if(diaHoy === 0) return 6;
        if(diaHoy === 1) return 0;
        return (diaHoy - 1);
      }
      //const hoy = new Date().toLocaleDateString();
      const hoy = new Date().toISOString().substring(0,10);
      var current = new Date();
      current.setDate(current.getDate() - calcularLunes(current.getDay()));
      var lunes = current.toISOString().substring(0,10);  

      const [numGrafica, setNumGrafica] = useState(1);
      const [fechaInicio, setFechaInicio] = useState(lunes);
      const [fechaFin, setFechaFin] = useState(hoy);

  return (
    <>
    <div id="divGrafica" className="container text-center">    
      <div className='caja titulo'>
          <div className='ti'><h2 className="h1Titulo">Box Jump Burpees</h2></div>
      </div> 
      <div className='caja fechas'>
        <input id='fecha1' type="date" 
                    defaultValue={lunes} 
                    //onChange={e=>setFechaInicio(e.target.value)} 
                    onChange={(e)=>{
                      setFechaInicio(e.target.value);
                      //actualizarDashboard();
                    }} 
                  />
        <input type="date"
                    id='fecha2'
                    defaultValue={hoy} 
                    format= 'yyyy-MM-dd'
                    onChange={e=>setFechaFin(e.target.value)} 
                  />             
      </div>  
      <div className='caja grafica'>
      <div className="col boton"></div>
        <div className="row conPadding">        
          <div className="col boton">
            <Button
                variant="outline-warning" type="button" onClick={() => setNumGrafica(1)}>
                Delta Fuerza
            </Button>
          </div>
          <div className="col boton">
            <Button
                variant="outline-warning" type="button" onClick={() => setNumGrafica(2)}>
                Delta Velocidad
            </Button>
          </div>
          <div className="col boton">
            <Button
                variant="outline-warning" type="button" onClick={() => setNumGrafica(3)}>
                Zona de Ritmo
            </Button>
          </div>
          <div className="col boton">
            <Button
                variant="outline-warning" type="button" onClick={() => setNumGrafica(4)}>
                Peso de Usuario
            </Button>
          </div>
        </div>
      </div>      
      <div className='caja grafica'>
        <div className="row">
          <div className="col">
            <Grafica numGrafica={numGrafica} idUsuario={props.idUsuario} fechaInicio={fechaInicio} fechaFin={fechaFin}/>
          </div>
        </div>
      </div>        
    </div>
    </>
  )
}
