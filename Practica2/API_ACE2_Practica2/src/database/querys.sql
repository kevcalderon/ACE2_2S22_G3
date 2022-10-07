-- Total Entrenos
SELECT COUNT(*) AS totalEntrenos FROM entreno 
WHERE idUsuario = 1 AND fecha BETWEEN '2022-10-02' AND '2022-10-02';

-- Total Calorias
SELECT SUM(caloriasPorEntrenamiento) AS totalCalorias FROM (
	SELECT DS.*, E.idUsuario, MAX(calorias) AS caloriasPorEntrenamiento FROM datos_sensor DS
	INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
	GROUP BY DS.idEntreno HAVING E.idUsuario = 1 AND DS.fecha BETWEEN '2022-10-02' AND '2022-10-03'
)AS subq;

-- Total Repeticiones
SELECT SUM(repsPorEntrenamiento) AS totalRepeticiones FROM (
	SELECT DS.*, E.idUsuario, MAX(numRepeticiones) AS repsPorEntrenamiento FROM datos_sensor DS
	INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
	GROUP BY DS.idEntreno HAVING E.idUsuario = 1 AND DS.fecha BETWEEN '2022-10-02' AND '2022-10-03'
)AS subq;

-- Rango Maximo Mov
SELECT MAX(rangoDistancia) AS rangoMaxMov FROM datos_sensor DS
INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
WHERE E.idUsuario = 1 AND DS.fecha BETWEEN '2022-10-02' AND '2022-10-03';

-- Rango Promedio Mov
SELECT AVG(rangoDistancia) AS rangoPromedioMov FROM datos_sensor DS
INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
WHERE E.idUsuario = 1 AND DS.fecha BETWEEN '2022-10-02' AND '2022-10-03';

-- Hora Inicial por Entreno
SELECT MIN(hora) as horaInicial FROM datos_sensor DS
INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
WHERE E.idUsuario = 1 AND DS.fecha BETWEEN '2022-10-02' AND '2022-10-03' 
GROUP BY DS.idEntreno;

-- Hora Final por Entreno
SELECT MAX(hora) as horaFinal FROM datos_sensor DS
INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
WHERE E.idUsuario = 1 AND DS.fecha BETWEEN '2022-10-02' AND '2022-10-03' 
GROUP BY DS.idEntreno;