#from crypt import methods
from flask import Flask,jsonify,request
from flask_mysqldb import MySQL
from config import config

app=Flask(__name__)

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

        return jsonify({'sensores':sensores})
    except Exception as ex:
        return jsonify({'mensaje':"Error"})

@app.route('/datos/<codigo>',methods=['GET'])
def getDato(codigo):
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT * FROM datosSensores WHERE id ='{0}'".format(codigo)
        cursor.execute(sql)
        datos = cursor.fetchone()
        if datos != None:
            sensor = {'fecha':datos[1],'temperatura':datos[2],'frecuencia':datos[3],'caloria':datos[4],'oxigeno':datos[5],'distancia':datos[6]}
            return jsonify({'sensores':sensor})
        else:
            return jsonify({'mensaje':"Curso no encontrado"})
    except Exception as ex:
        return jsonify({'mensaje':"Error"})

@app.route('/datos',methods=['POST'])
def setDato():
    try:
        #print(request.json)
        cursor = conexion.connection.cursor()
        sql = """INSERT INTO datosSensores(fecha, temperatura,frecuencia,caloria,oxigeno,distancia) 
        VALUES ('{0}',{1},{2},{3},{4},{5})""".format(request.json['fecha'],request.json['temperatura'],request.json['frecuencia'],request.json['caloria'],request.json['oxigeno'],request.json['distancia'])
        cursor.execute(sql)
        conexion.connection.commit() #esto confirma la acción de inserción
        return jsonify({'mensaje':"Dato registrado."})
    except Exception as ex:
        return jsonify({'mensaje':"Error"})

@app.route('/datos/<codigo>',methods =['DELETE'])
def eliminarDato(codigo):
    try:
        #print(request.json)
        cursor = conexion.connection.cursor()
        sql = "DELETe FROM datosSensores WHERE id= {0}".format(codigo)
        cursor.execute(sql)
        conexion.connection.commit() #esto confirma la acción de inserción
        return jsonify({'mensaje':"Dato eliminado."})
    except Exception as ex:
        return jsonify({'mensaje':"Error"})

@app.route('/datos/<codigo>',methods =['PUT'])
def actualizarDato(codigo):
    try:
        #print(request.json)
        cursor = conexion.connection.cursor()
        sql = """UPDATE datosSensores 
        SET fecha = '{0}',temperatura = {1},
        frecuencia = {2}, caloria = {3},
        oxigeno = {4}, distancia = {5} 
        WHERE id = {6}""".format(request.json['fecha'],request.json['temperatura'],request.json['frecuencia'],request.json['caloria'],request.json['oxigeno'],request.json['distancia'],codigo)
        cursor.execute(sql)
        conexion.connection.commit() #esto confirma la acción de update
        return jsonify({'mensaje':"Dato actualizado."})
    except Exception as ex:
        return jsonify({'mensaje':"Error"})

def paginaNoEncontrada(error):
    return "<h1>Página no existe</h1>", 404

if __name__=='__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404,paginaNoEncontrada)
    app.run()
