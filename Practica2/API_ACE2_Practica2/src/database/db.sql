-- PLANET SCALE

CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    edad INT,
    peso DECIMAL(6,2),
    genero CHAR(1),
    estatura DECIMAL(6,2)
);

CREATE TABLE entreno (
    idEntreno INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(15) NOT NULL,
    idUsuario INT NOT NULL,
    KEY fk_idEntreno_idUsuario (idUsuario)
);

CREATE TABLE datos_sensor (
    idSensor INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(15) NOT NULL,
    hora DECIMAL(6,2) NOT NULL,
    pulso INT NOT NULL,
    rangoDistancia INT NOT NULL,
    frecuenciaRepeticion INT NOT NULL,
    numRepeticiones INT NOT NULL,
    calorias DECIMAL(6,2) NOT NULL,
    idEntreno INT NOT NULL,
    KEY fk_idSensor_idEntreno (idEntreno)
);