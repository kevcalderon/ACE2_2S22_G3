import React from 'react';
import { useState, useEffect } from 'react';
import {Line, Bar, Scatter } from 'react-chartjs-2';
import {Chart as ChartJS, LineElement} from 'chart.js/auto';
import {datosGrafica0} from './Data'

function Chart2({experimento}) {
  
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
    console.log(datosExperimento);
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
                max:50,
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
              max:20,
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
              max:50,
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
    console.log(responseJSON);
    return responseJSON;
  }

  useEffect(() => {
    fetchApi();
  }, []);

  if(peticionDatosApi){
    if(experimento ===1){      
      return Grafica1(peticionDatosApi.sensores);
    }else if(experimento ===2){
      return Grafica2(peticionDatosApi.sensores);
    }else if(experimento ===3){
      return Grafica3(peticionDatosApi.sensores);
    }
  }else return Grafica0();
  
}

export default Chart2