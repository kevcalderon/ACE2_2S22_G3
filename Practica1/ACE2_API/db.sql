create database ACE2_Practica1;

use ACE2_Practica1;
create table datosSensores(	
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL, #'0000-00-00 00:00:00'
    temperatura varchar(15),
    pulso varchar(15),
    oxigeno varchar(15),
    velocidad varchar(15),
    distancia varchar(15),
    calorias varchar(15)
);


