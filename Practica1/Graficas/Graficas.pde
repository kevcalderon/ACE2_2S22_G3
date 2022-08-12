import processing.serial.*;
import javax.swing.JOptionPane;
import http.requests.*;
int x = 65, ancho = 700, alto = 600;
int cFondo = 255; //Color fondo
boolean flagTemp = false; 
boolean pH = true;
boolean pT = true;
float t = 100, h = 0 ;
PrintWriter datos;
Serial myPort;
Serial puertoArduino;
Graf g = new Graf(ancho, alto, cFondo);
ParticleSystem ps;
String mensaje = null;





void setup(){
 myPort = new Serial(this, "COM5", 9600);
  size(1000, 600);
  background(255);
  fill(255, 0, 0);

  pT = true;
  pH = true;
   //
  //OBTENER SENSOR Y PONER EN CUADRICULA DE TEXTO
  g.cuadricula1();
  g.cuadricula2();  

  
  
  //PARTICULAS
  ps = new ParticleSystem(new PVector(850,250));
}

void draw(){

   if(myPort.available()>0){
    //Igualamos a nuestra variable de texto a lo que nos devuelva la función readStringUntil. 
    //Dicha función lee todo lo que haya en el puerto serial hasta que encuentre un 'Enter', representado por el caracter especial '\n'.
    //Cabe destacar que este 'Enter' es el mismo que el Arduino escribe al final de cada línea por usar Serial.println
    mensaje = myPort.readStringUntil('\n');
  }
    if (mensaje!=null){
      //println(mensaje);
     int []value=int(split(mensaje,'/'));
     println(value[0]);
    
     fill(255,255,255);
     noStroke();
     rectMode(CORNERS); 
     rect(140,20,200,45);//Borra lectura anterior 
     h = value[1];
  
  
     //Grafica de temperatura corporal  
     flagTemp = true;
     fill (0,0,255);
     text(h, 460, 68);
     println("Temperatura Corporal :", value[0]);
     g.puntosH(x, value[0], pH);
     pH = false;
     
     
     //Grafica de Velocidad
     fill (0,0,255);
     //text(h, 140, 40);
     println("Velocidad :", h);
     g.puntosT(x, h, pH);
 
     
     
     x = x + 5;
    
         
     if (x > ancho - 60) {
        x = 60;
        pT = true;
        pH = true;
        g.borra();
        g.cuadricula1();
        g.cuadricula2();
              
     }
     
     //value[0] = temperatura
     //value[1] = velocidad
     //value[2] = oxigeno
     //value[3] = pulso
     PostRequest post = new PostRequest("http://127.0.0.1:3000/compiler");
     post.addData("temperatura", str(h));
     //post.addDate("velocidad"
     post.send();
     
     
     
     
    // text("    ", 460, 68);
     delay(1000);
 
      // background(255);
      //ps.addParticle();
      //ps.run();
    }
     //calorias
    
     
}
