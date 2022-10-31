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

CREATE TABLE tipoEntreno(
    idTipoEntreno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE entreno (
    idEntreno INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(15) NOT NULL,
    idUsuario INT NOT NULL,
    idTipoEntreno INT NOT NULL,
    KEY fk_idEntreno_idUsuario (idUsuario),
    KEY fk_idEntreno_idTipoEntreno (idTipoEntreno)
);

CREATE TABLE datosSensor (
    idDatosSensor INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(15) NOT NULL,
    hora DECIMAL(6,2) NOT NULL,
    fuerzaImpulsoInicial INT NOT NULL,
    fuerzaImpulsoFinal INT NOT NULL,
    velocidadImpulso INT NOT NULL,
    ritmo INT NOT NULL,
    calorias DECIMAL(6,2) NOT NULL,
    peso DECIMAL(6,2) NOT NULL,
    idEntreno INT NOT NULL,
    KEY fk_idDatosSensor_idEntreno (idEntreno)
);