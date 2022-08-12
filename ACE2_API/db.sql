create database ACE2_Practica1;

use ACE2_Practica1;
create table datosSensores(	
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL, #'0000-00-00 00:00:00'
    temperatura float,
    frecuencia float,
    caloria float,
    oxigeno float,
    distancia float
);


