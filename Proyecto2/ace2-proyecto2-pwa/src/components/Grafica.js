import React from 'react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Grafica(props) {
  
    const Grafica0 = () => {  
        
        const datosGrafica0 = [
            {
                id:1,
                nombre:'Cargando datos'        
            },
            {
                id:2,
                nombre:'Cargando datos '        
            },
            {
                id:3,
                nombre:'Cargando datos '        
            }    ,
            {
                id:4,
                nombre:'Cargando datos '        
            }
        ]
      const data = {
          labels: datosGrafica0.map((data) => data.nombre),
          datasets:[
            {
              label: "...",
              data: datosGrafica0.map((data) => data.id),
              borderColor: ['#FFFFFF'],
              backgroundColor: ['#6798D0'],
              fontColor:['#FFFFFF']
            }   
            
          ]
      };
  
      const options = {
        responsive: true,
        scales:{
            y: {
                min: 0,
                max: 100,
                grid: {
                    //color: ['#FFFFFF'],
                    borderColor: ['#FFFFFF']
                },
                ticks: {
                    color: ['#FFFFFF']
                }           
            },
            x: {
                grid: {
                    //color: ['#FFFFFF'],
                    borderColor: ['#FFFFFF']
                },
                ticks: {
                    color: ['#FFFFFF']
                }
            }

        },
        plugins: {          
            title: {
                display: true,
                text: '...',
                color:['#FFFFFF']
            }            
        },
    };
  
      return ( 
          <>
            <Line data={data} options={options} />
          </>
      );
  }
  
    const Grafica1 = (datosExperimento) => {  
      //const datosRango = datosExperimento.filter(n => n.fecha > "2022-01-01" && n.fecha  > "2022-01-02");
      //console.log(datosRango);
      if(datosExperimento){
        const data = {
          labels: datosExperimento.map((data) => data.fecha + ' ' + data.hora),
          datasets:[
            {
              label: "Fuerza",
              data: datosExperimento.map((data) => ((data.fuerzaImpulsoInicial + data.fuerzaImpulsoFinal)/2)),
              borderColor: ['#f83e0e'],
              backgroundColor: ['#ffffff'],
              //fontColor: ['#ff2323']
            }   
            
          ]
        };
  
        const options = {
          responsive: true,
          scales:{
            y: {
                min:0,      
                max: 125,          
                grid: {
                    borderColor: ['#FFFFFF']
                },
                ticks: {
                    color: ['#FFFFFF']
                }           
            },
            x: {
                grid: {
                    borderColor: ['#FFFFFF']
                },
                ticks: {
                    color: ['#FFFFFF']
                }
            }
          },
          plugins: {          
              title: {
                  display: true,
                  text: 'Delta Fuerza',
                  color:['#FFFFFF']
              },
          },
      };
  
        return ( 
            <>
                <Line data={data} options={options} />
            </>
        );
      }
      return Grafica0();
  }
  
  const Grafica2 = (datosExperimento) => {    
    if(datosExperimento){
      const data = {
        labels: datosExperimento.map((data) => data.fecha + ' ' + data.hora),
        datasets:[
          {
            label: "Velocidad",
            data: datosExperimento.map((data) => data.velocidadImpulso),
            borderColor: ['#4df2cf'],
            backgroundColor: ['#ffffff']
          }           
        ]
      };
  
      const options = {
        responsive: true,
        scales:{
            y: {
                min:0,      
                max: 50,          
                grid: {
                    borderColor: ['#FFFFFF']
                },
                ticks: {
                    color: ['#FFFFFF']
                }           
            },
            x: {
                grid: {
                    borderColor: ['#FFFFFF']
                },
                ticks: {
                    color: ['#FFFFFF']
                }
            }
        },
        plugins: {          
            title: {
                display: true,
                text: 'Delta Velocidad',
                color:['#FFFFFF']
            },
        },
    };
  
      return ( 
          <>
              <Line data={data} options={options} />
          </>
      );
    }
    return Grafica0();
  }
  
  const Grafica3 = (datosExperimento) => {    
    if(datosExperimento){
      const data = {
        labels: datosExperimento.map((data) => data.fecha + ' ' + data.hora),
        datasets:[
          {
            label: "% de tiempo que se mantiene en la zona de ritmo",
            data: datosExperimento.map((data) => data.ritmo),
            borderColor: ['#edf550'],
            backgroundColor: ['#ffffff']
          }           
        ]
      };
  
      const options = {
        responsive: true,
        scales:{
            y: {
                min:0,      
                max: 100,          
                grid: {
                    borderColor: ['#FFFFFF']
                },
                ticks: {
                    color: ['#FFFFFF']
                }           
            },
            x: {
                grid: {
                    borderColor: ['#FFFFFF']
                },
                ticks: {
                    color: ['#FFFFFF']
                }
            }
        },
        plugins: {          
            title: {
                display: true,
                text: '% de tiempo que se mantiene en la zona de ritmo',
                color:['#FFFFFF']
            },
        },
    };
  
      return ( 
          <>
              <Line data={data} options={options} />
          </>
      );
    }
    return Grafica0();
  }

  const Grafica4 = (datosExperimento) => {  
    //const datosRango = datosExperimento.filter(n => n.fecha > "2022-01-01" && n.fecha  > "2022-01-02");
    //console.log(datosRango);
    if(datosExperimento){
      const data = {
        labels: datosExperimento.map((data) => data.fecha + ' ' + data.hora),
        datasets:[
          {
            label: "Peso",
            data: datosExperimento.map((data) => (data.peso)),
            borderColor: ['#008f39'],
            backgroundColor: ['#ffffff'],
            //fontColor: ['#ff2323']
          }   
          
        ]
      };

      const options = {
        responsive: true,
        scales:{
          y: {
              min:0,      
              max: 250,          
              grid: {
                  borderColor: ['#FFFFFF']
              },
              ticks: {
                  color: ['#FFFFFF']
              }           
          },
          x: {
              grid: {
                  borderColor: ['#FFFFFF']
              },
              ticks: {
                  color: ['#FFFFFF']
              }
          }
        },
        plugins: {          
            title: {
                display: true,
                text: 'Peso del Usuario',
                color:['#FFFFFF']
            },
        },
    };

      return ( 
          <>
              <Line data={data} options={options} />
          </>
      );
    }
    return Grafica0();
}
  
  const url= `https://api-ace2-proyec2.herokuapp.com/entreno-dashboard/grafica/fechaInicial/${props.fechaInicio}/fechaFinal/${props.fechaFin}/idUsuario/${props.idUsuario}`;
    const [peticionDatosApi, setPeticionDatosApi] = useState([]);
    
    fetch(url)
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);    
            setPeticionDatosApi(data);     
            })
          .catch((err) => console.log(err));
  
    if(peticionDatosApi && props.fechaInicio && props.fechaFin){
        //console.warn(peticionDatosApi);
      console.log("props.fechaInicio " + props.fechaInicio);
      console.log("props.fechaFin " + props.fechaFin);
      /*const fecha2 = props.fechaFin + " 23:59:59"
      const datosRango = peticionDatosApi.sensores.filter(n => new Date(n.fecha) > new Date(props.fechaInicio) && new Date(n.fecha) < new Date(fecha2));
      console.log(datosRango);*/
      if(props.numGrafica ===1){      
        return Grafica1(peticionDatosApi);
      }else if(props.numGrafica ===2){
        return Grafica2(peticionDatosApi);
      }else if(props.numGrafica ===3){
        return Grafica3(peticionDatosApi);
      }else if(props.numGrafica ===4){
        return Grafica4(peticionDatosApi);
      }else if(props.numGrafica ===10){
        console.log(Chart);
        return Grafica3();        
      }
      return Grafica0();
    }else return Grafica0();
    
  }
  
  export default Grafica