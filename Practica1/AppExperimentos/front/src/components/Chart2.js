import React from 'react';
import { useState, useEffect } from 'react';
import {Line, Bar, Scatter } from 'react-chartjs-2';
import {Chart as ChartJS, LineElement} from 'chart.js/auto';
import {datosGrafica0} from './Data'

function Chart2(props) {
  
  const Grafica0 = () => {  
    const data = {
        labels: datosGrafica0.map((data) => data.nombre),
        datasets:[
          {
            label: "...",
            data: datosGrafica0.map((data) => data.id),
            borderColor: ['#FFFFFF'],
            backgroundColor: ['#6798D0']
          }   
          
        ]
    };

    const options = {
      responsive: true,
      scales:{
          y: {
              min:0,
              max:5             
          }
      },
      plugins: {          
          title: {
              display: true,
              text: '...',
              color:['#FFFFFF']
          },
      },
  };

    return ( 
        <>
            <Bar data={data} options={options} />
        </>
    );
}

  const Grafica1 = (datosExperimento) => {  
    //const datosRango = datosExperimento.filter(n => n.fecha > "2022-01-01" && n.fecha  > "2022-01-02");
    //console.log(datosRango);
    if(datosExperimento){
      const data = {
        labels: datosExperimento.map((data) => data.fecha),
        datasets:[
          {
            label: "Calorías",
            data: datosExperimento.map((data) => data.calorias),
            borderColor: ['#FFFFFF'],
            backgroundColor: ['#6798D0']
          }   
          
        ]
      };

      const options = {
        responsive: true,
        scales:{
            y: {
                min:0,
                max:2,
                stepSize: 1,              
            }
        },
        plugins: {          
            title: {
                display: true,
                text: 'Calorías quemadas vs Tiempo',
                color:['#FFFFFF']
            },
        },
    };

      return ( 
          <>
              <Bar data={data} options={options} />
          </>
      );
    }
    return Grafica0();
}

const Grafica2 = (datosExperimento) => {    
  if(datosExperimento){
    const data = {
      labels: datosExperimento.map((data) => data.fecha),
      datasets:[
        {
          label: "Distancia",
          data: datosExperimento.map((data) => data.distancia),
          borderColor: ['#FFFFFF'],
          backgroundColor: ['#6798D0']
        }           
      ]
    };

    const options = {
      responsive: true,
      scales:{
          y: {
              min:0,
              max:80,
              stepSize: 1,              
          }
      },
      plugins: {          
          title: {
              display: true,
              text: 'Distancia vs Tiempo',
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
      labels: datosExperimento.map((data) => data.fecha),
      datasets:[
        {
          label: 'Pulso cardiaco',
          data: datosExperimento.map((data) => data.pulso),
          borderColor: ['#F28773'],
          backgroundColor: ['#F28773']          
        },
        {
          label: 'Oxígeno',
          data: datosExperimento.map((data) => data.oxigeno),
          borderColor: ['#6798D0'],
          backgroundColor: ['#6798D0'],
          color:['#FFFFFF']
        }
      ]
    };

    const options = {
      responsive: true,
      scales:{
          y: {
              min:0,
              max:200,
              stepSize: 1,              
          }
      },
      plugins: {          
          title: {
              display: true,
              text: 'Pulso cardiaco y oxígeno vs Tiempo',
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

  const url = 'http://127.0.0.1:3000/datos';
  const [peticionDatosApi, setPeticionDatosApi] = useState([]);
  
  const fetchApi = async () => {
    const response = await fetch(url);
    //console.log(response.status);
    const responseJSON = await response.json();
    setPeticionDatosApi(responseJSON);
    //console.log(responseJSON);
    return responseJSON;
  }

  useEffect(() => {
    fetchApi();
  }, []);

  if(peticionDatosApi.sensores && props.fechaInicio && props.fechaFin){
    console.log("props.fechaInicio " + props.fechaInicio);
    console.log("props.fechaFin " + props.fechaFin);
    const fecha2 = props.fechaFin + " 23:59:59"
    const datosRango = peticionDatosApi.sensores.filter(n => new Date(n.fecha) > new Date(props.fechaInicio) && new Date(n.fecha) < new Date(fecha2));
    console.log(datosRango);
    if(props.experimento ===1){      
      return Grafica1(datosRango);
    }else if(props.experimento ===2){
      return Grafica2(datosRango);
    }else if(props.experimento ===3){
      return Grafica3(datosRango);
    }
  }else return Grafica0();
  
}

export default Chart2