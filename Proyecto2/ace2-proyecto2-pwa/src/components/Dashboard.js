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
      const [cantidadFuerza, setCantidadBoxJump] = useState(0);
      const [cantidadVelocidad, setCantidadStepUp] = useState(0);
      const [cantidadRitmo, setCantidadJumpOver] = useState(0);
      const url= `https://api-ace2-proyec2.herokuapp.com/entreno-dashboard/conteo/fechaInicial/${fechaInicio}/fechaFinal/${fechaFin}/idUsuario/${props.idUsuario}`;
    
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
    
            setTiempoTotalEntrenamiento(data.tiempoTotalEntreno);        
            setCantidadEntrenamientos(data.totalEntrenos);
            setCantidadBoxJump(data.boxJump);
            setCantidadStepUp(data.stepUp);
            setCantidadJumpOver(data.jumpOver);
          })
          .catch((err) => console.log(err));
  return (
    <>
    <div id="divReporte" className="container text-center">    
      <div className='caja titulo'>
          <div className='ti'><h1 className="h1Titulo">Box Jump Burpees</h1></div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                  </svg>
                  </div>
                  <div className="row"><h6 className="cantidad">Box Jump</h6></div>
                  <div className="row"><h2 className="cantidad">{cantidadFuerza}</h2></div>                  
                </div>
                <div className="col">
                  <div className="row">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
                    <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
                  </svg>
                  </div>
                  <div className="row"><h6 className="cantidad">Step Up</h6></div>
                  <div className="row"><h2 className="cantidad">{cantidadVelocidad}</h2></div>
                </div>
                <div className="col">
                  <div className="row">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-stack-overflow" viewBox="0 0 16 16">
                    <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
                    <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
                  </svg>
                  </div>
                  <div className="row"><h6 className="cantidad">Jump Over</h6></div>
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

