CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(50) NOT NULL,
    edad INT,
    peso DECIMAL(6,2),
    genero CHAR(1),
    estatura DECIMAL(6,2)
);

CREATE TABLE datos_sensor (
    idSensor INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(15) NOT NULL,
    hora DECIMAL(6,2) NOT NULL,
    fuerzaGolpe DECIMAL(6,2) NOT NULL,
    velocidad DECIMAL(6,2) NOT NULL,
    porcentajeRitmo DECIMAL(6,2) NOT NULL,
    idUsuario INT NOT NULL,
    CONSTRAINT fk_idSensor_idUsuario FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario)
);

CREATE TABLE tipo_entreno (
    idTipoEntreno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha VARCHAR(15) NOT NULL,
    idUsuario INT NOT NULL,
    CONSTRAINT fk_idTipoEntreno_idUsuario FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario)
);

CREATE TABLE temporal_sensor (
    idTmpSensor INT AUTO_INCREMENT PRIMARY KEY,
    fuerzaGolpe DECIMAL(6,2) NOT NULL,
    velocidad DECIMAL(6,2) NOT NULL
);


-- PLANET SCALE
CREATE TABLE datos_sensor (
    idSensor INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(15) NOT NULL,
    hora DECIMAL(6,2) NOT NULL,
    fuerzaGolpe DECIMAL(6,2) NOT NULL,
    velocidad DECIMAL(6,2) NOT NULL,
    porcentajeRitmo DECIMAL(6,2) NOT NULL,
    idUsuario INT NOT NULL,
    KEY fk_idSensor_idUsuario (idUsuario)
);

CREATE TABLE tipo_entreno (
    idTipoEntreno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha VARCHAR(15) NOT NULL,
    idUsuario INT NOT NULL,
    KEY fk_idTipoEntreno_idUsuario (idUsuario)
);
