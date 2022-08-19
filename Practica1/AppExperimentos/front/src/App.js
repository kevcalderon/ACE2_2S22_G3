import { useState } from 'react';
import './App.css';
import Chart1 from './components/Chart1';
import Chart2 from './components/Chart2';
import {bookData} from './Data'

function App() {

  const [experimento, setExperimento] = useState(1);
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());

  const hoy = new Date().toLocaleDateString();

  
  return (
    <div className="App">    
      <div><br /></div>  
      <div className='grid-layout'>
        <div className='caja titulo'>
          <div className='ti'><h1>Indoor Cycling Smart</h1></div>
        </div>
        <div className='caja imagenUsuario'>
          <div className='imagen'></div>
        </div>
        <div className='caja grafica'>
          <div >
            <Chart2 experimento={experimento} fechaInicio={fechaInicio} fechaFin={fechaFin}/>
          </div>
        </div>
        <div className='caja botones'>
          <div />
          <button type="button" onClick={() => setExperimento(1)}>Experimento No. 1</button>
          <button type="button" onClick={() => setExperimento(2)}>Experimento No. 2</button>
          <button type="button" onClick={() => setExperimento(3)}>Experimento No. 3</button>          
        </div>
        <div className='caja fechas'>
          <div className='divFecha'>
            <div className='fechaInicio'>
              <input id='fecha1' type="date" 
                defaultValue={hoy} 
                onChange={e=>setFechaInicio(e.target.value)} 
              />
            </div>
            <div className='fechaFin'>
              <input type="date"
                id='fecha2'
                defaultValue={hoy} 
                //format= 'yyyy-MM-dd'
                onChange={e=>setFechaFin(e.target.value)} 
              />
            </div>
          </div>
          <div>                        
          </div>           
        </div>
      </div>
    </div>

  );
}

export default App;
