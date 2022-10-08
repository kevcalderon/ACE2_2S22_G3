import React from 'react';
import { useState } from 'react';

export default function DashboardResumen(props) {
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

      var lista = [
        {
            idEntreno:0,
            nombreEntreno:'General'
        }
      ];
    
      const [fechaInicio, setFechaInicio] = useState(lunes);
      const [fechaFin, setFechaFin] = useState(hoy);
      const [totalRepeticiones, setTotalRepeticiones] = useState(0);
      const [tiempoTotalEntrenamiento, setTiempoTotalEntrenamiento] = useState(0);
      const [rangoMaximoMovimiento, setRangoMaximoMovimiento] = useState(0);
      const [rangoPromedioMovimiento, setRangoPromedioMovimiento] = useState(0);
      const [totalCalorias, setTotalCalorias] = useState(0);
      //const [fechaEntrenamiento, setFechaEntrenamiento] = useState('yyyy/MM/dd');
      const [entreno, setEntreno] = useState(0);
      const [listaEntrenos, setListaEntrenos] = useState(lista.map(o => (
        <option key={o.idEntreno} value={o.idEntreno}>{o.nombreEntreno}</option>
      )));      

      /*const url = 
        entreno === 0 ? `https://api-ace2-pract2.herokuapp.com/entreno-dashboard/conteo/fechaInicial/${fechaInicio}/fechaFinal/${fechaFin}/idUsuario/${props.idUsuario}`
                      : `https://api-ace2-pract2.herokuapp.com/entreno-dashboard/conteo/fechaInicial/${fechaInicio}/fechaFinal/${fechaFin}/idUsuario/${props.idUsuario}/idEntreno/${entreno}`;*/
    
        fetch((entreno === "0" || entreno === 0) ? `https://api-ace2-pract2.herokuapp.com/entreno-dashboard/conteo/fechaInicial/${fechaInicio}/fechaFinal/${fechaFin}/idUsuario/${props.idUsuario}`
        : `https://api-ace2-pract2.herokuapp.com/entreno-dashboard/conteo/fechaInicial/${fechaInicio}/fechaFinal/${fechaFin}/idUsuario/${props.idUsuario}/idEntreno/${entreno}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);             
            console.log("Num entreno: "+entreno);  
            (entreno === "0" || entreno === 0) ? console.log(`https://api-ace2-pract2.herokuapp.com/entreno-dashboard/conteo/fechaInicial/${fechaInicio}/fechaFinal/${fechaFin}/idUsuario/${props.idUsuario}`)
            : console.log(`https://api-ace2-pract2.herokuapp.com/entreno-dashboard/conteo/fechaInicial/${fechaInicio}/fechaFinal/${fechaFin}/idUsuario/${props.idUsuario}/idEntreno/${entreno}`);
            setTotalRepeticiones(data.totalRepeticiones);        
            setTiempoTotalEntrenamiento(data.tiempoTotalEntreno);
            setRangoMaximoMovimiento(data.rangoMaxMov);
            setRangoPromedioMovimiento(data.rangoPromedioMov);
            setTotalCalorias(data.totalCalorias);
            if(entreno === "0" || entreno === 0){              
              //console.warn(data.entrenos);
              lista = data.entrenos;
              lista.push({
                idEntreno:0,
                nombreEntreno:'General',
                fecha: ''
                });
              setListaEntrenos(lista.map(o => (
                <option key={o.idEntreno} value={o.idEntreno}>{o.nombreEntreno + ' ' + o.fecha}</option>
              )));
              console.log('general');
              console.log(listaEntrenos);
              //console.warn(data.entrenos);
              /*
              lista.push({
                idEntreno:1,
                nombre:'General1'
              });
              setListaEntrenos(lista);*/
            }
          })
          .catch((err) => console.log(err));
  
          const handleChange = event => {
            //console.log(event.target.value);
            setEntreno(event.target.value);
          };

  return (
    <>
    <div id="divReporte" className="container text-center">    
      <div className='caja titulo'>
          <div className='ti'><h1 className="h1Titulo">Entrenamiento de Flexiones</h1></div>
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
      <div className='caja fechas'>
        <select id="selectEntreno" onChange={handleChange}>
          {listaEntrenos}
        </select>
      </div>       
      <div className='caja grafica'>
        <div className="row">          
          <div className="col">
            <div className="datoDashboard">
            <div className="row">
                <div className="col">
                  <h5>Número de repeticiones</h5>
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
                  <h1 className="cantidad">{totalRepeticiones}</h1>
                </div>
              </div>
            </div>
          </div>
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
        </div>    
        <div className="row">
          <div className="col">
            <div className="datoDashboard">
              <div className="row">
                <div className="col">
                  <h5>Rango máximo de movimiento</h5>
                </div>
              </div> 
              <div className="row">
                <div className="col">
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
                   <br/>
                </div>
                <div className="col">
                  <h1 className="cantidad">{rangoMaximoMovimiento}</h1>
                </div>
              </div> 
            </div>              
          </div>
          <div className="col">
            <div className="datoDashboard">
            <div className="row">
                <div className="col">
                  <h5>Rango promedio de movimiento</h5>
                </div>
              </div> 
              <div className="row">
                <div className="col">
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" className="bi bi-plus-slash-minus" viewBox="0 0 16 16">
                  <path d="m1.854 14.854 13-13a.5.5 0 0 0-.708-.708l-13 13a.5.5 0 0 0 .708.708ZM4 1a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 4 1Zm5 11a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 9 12Z"/>
                </svg><br/>
                </div>
                <div className="col">
                  <h1 className="cantidad">{rangoPromedioMovimiento}</h1>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div className="row">
        <div className="col">
            <div className="datoDashboard">
              <div className="row">
                <div className="col">
                  <h5>Calorías quemadas</h5>
                </div>
              </div> 
              <div className="row">
                <div className="col">
                  <br/>
                </div>
                <div className="col">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                </svg><br/>
                </div>
                <div className="col">
                  <h1 className="cantidad">{totalCalorias}</h1>
                </div>
                <div className="col">
                  <br/>
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

