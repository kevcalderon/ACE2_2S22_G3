from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
from config import config
from datetime import datetime

app=Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

conexion = MySQL(app)

@app.route('/datos', methods=['GET'])
def getDatos():
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT * FROM datosSensores"
        cursor.execute(sql)
        datos = cursor.fetchall()
        sensores = []
        for fila in datos:
            sensor = {'fecha':fila[1],'temperatura':fila[2],'frecuencia':fila[3],'caloria':fila[4],'oxigeno':fila[5],'distancia':fila[6]}
            sensores.append(sensor)

        return jsonify({'sensores':sensores,'resultado':1})
    except Exception as ex:
        return jsonify({'mensaje':"Error",'resultado':-1})

@app.route('/datos/<codigo>',methods=['GET'])
def getDato(codigo):
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT * FROM datosSensores WHERE id ={0}".format(codigo)
        cursor.execute(sql)
        datos = cursor.fetchone()
        if datos != None:
            sensor = {'fecha':datos[1],'temperatura':datos[2],'frecuencia':datos[3],'caloria':datos[4],'oxigeno':datos[5],'distancia':datos[6]}
            return jsonify({'sensores':sensor, 'resultado':1})
        else:
            return jsonify({'resultado':-1, 'mensaje':"Dato no encontrado"})
    except Exception as ex:
        return jsonify({'mensaje':"Error"})

@app.route('/datos',methods=['POST'])
def setDato():
    try:
        #print(request.json)
        cursor = conexion.connection.cursor()
        sql = """INSERT INTO datosSensores(fecha, temperatura,pulso,oxigeno,velocidad,distancia,calorias) 
        VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}')""".format(datetime.today().strftime('%Y-%m-%d %H:%M:%S'),request.form['temperatura'],request.form['pulso'],request.form['oxigeno'],request.form['velocidad'],request.form['distancia'],request.form['calorias'])
        cursor.execute(sql)
        conexion.connection.commit() 
        return jsonify({'mensaje':"Dato registrado.",'resultado':1})
    except Exception as ex:
        return jsonify({'mensaje':"Error",'resultado':-1})

@app.route('/datos/<codigo>',methods =['DELETE'])
def eliminarDato(codigo):
    try:
        #print(request.json)
        cursor = conexion.connection.cursor()
        sql = "DELETe FROM datosSensores WHERE id= {0}".format(codigo)
        cursor.execute(sql)
        conexion.connection.commit() 
        return jsonify({'mensaje':"Dato eliminado.",'resultado':1})
    except Exception as ex:
        return jsonify({'mensaje':"Error",'resultado':-1})

@app.route('/datos/<codigo>',methods =['PUT'])
def actualizarDato(codigo):
    try:
        #print(request.json)
        cursor = conexion.connection.cursor()
        sql = """UPDATE datosSensores 
        SET fecha = '{0}',temperatura = '{1}',
        frecuencia = '{2}', caloria = '{3}',
        oxigeno = '{4}', distancia = '{5}' 
        WHERE id = '{6}'""".format(request.json['fecha'],request.json['temperatura'],request.json['frecuencia'],request.json['caloria'],request.json['oxigeno'],request.json['distancia'],codigo)
        cursor.execute(sql)
        conexion.connection.commit() 
        return jsonify({'mensaje':"Dato actualizado.",'resultado':1})
    except Exception as ex:
        return jsonify({'mensaje':"Error",'resultado':-1})

def paginaNoEncontrada(error):
    return "Página no existe", 404

if __name__=='__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404,paginaNoEncontrada)
    app.run(port=3000)

