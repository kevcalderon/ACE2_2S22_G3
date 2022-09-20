import React from 'react';
import { useState } from 'react';

export default function Dashboard(props) {
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
    
      const [fechaInicio, setFechaInicio] = useState(lunes);
      const [fechaFin, setFechaFin] = useState(hoy);
      const [tiempoTotalEntrenamiento, setTiempoTotalEntrenamiento] = useState(0);
      const [cantidadEntrenamientos, setCantidadEntrenamientos] = useState(0);
      const [cantidadFuerza, setCantidadFuerza] = useState(0);
      const [cantidadVelocidad, setCantidadVelocidad] = useState(0);
      const [cantidadRitmo, setCantidadRitmo] = useState(0);
      const url= `https://api-ace2-p1.herokuapp.com/entreno-dashboard/conteo/fechaInicial/${fechaInicio}/fechaFinal/${fechaFin}/idUsuario/${props.idUsuario}`;
    
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
    
            setTiempoTotalEntrenamiento(data.tiempo);        
            setCantidadEntrenamientos(data.total);
            setCantidadFuerza(data.fuerza);
            setCantidadVelocidad(data.velocidad);
            setCantidadRitmo(data.ritmo);
          })
          .catch((err) => console.log(err));
  return (
    <>
    <div id="divReporte" className="container text-center">    
      <div className='caja titulo'>
          <div className='ti'><h1 className="h1Titulo">Bolsa de boxeo de velocidad</h1></div>
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
        <div className="row">
          <div className="col">
            <div className="datoDashboard">
              <div className="row">
                <div className="col">
                  <h5>Tiempo total de entrenamiento</h5>
                </div>
              </div> 
              <div className="row">
                <div className="col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                  </svg> <br/>
                </div>
                <div className="col">
                  <h1 className="cantidad">{tiempoTotalEntrenamiento}</h1>
                </div>
              </div> 
            </div>              
          </div>
          <div className="col">
            <div className="datoDashboard">
            <div className="row">
                <div className="col">
                  <h5>Cantidad de de entrenamientos</h5>
                </div>
              </div> 
              <div className="row">
                <div className="col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor"className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                      </svg> <br/>
                </div>
                <div className="col">
                  <h1 className="cantidad">{cantidadEntrenamientos}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>    
        <div className="row">
          <div className="col">
            <div className="datoDashboard" >
            <div className="row" ><h5>Cantidad de entrenamientos por tipo</h5></div>
            <div className="row conPadding" >                
                <div className="col cCenter" >
                  <div className="row cCenter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                  </div>
                  <div className="row"><h6 className="cantidad">Fuerza</h6></div>
                  <div className="row"><h2 className="cantidad">{cantidadFuerza}</h2></div>                  
                </div>
                <div className="col">
                  <div className="row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"className="bi bi-speedometer2" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                      <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
                    </svg>
                  </div>
                  <div className="row"><h6 className="cantidad">Velocidad</h6></div>
                  <div className="row"><h2 className="cantidad">{cantidadVelocidad}</h2></div>
                </div>
                <div className="col">
                  <div className="row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"className="bi bi-activity" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
                    </svg>
                  </div>
                  <div className="row"><h6 className="cantidad">Ritmo</h6></div>
                  <div className="row"><h2 className="cantidad">{cantidadRitmo}</h2></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>        
    </div>
    </>
  );
}

