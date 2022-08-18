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
color verde = color(16,243,0);
color naranja = color(243,119,16);
color blanco = color(255,255,255);
color azul = color(26,37,210);
color rojo = color(210,26,26);

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
     float []value=float(split(mensaje,'/'));
     //println(value[0]);
    
     fill(255,255,255);
     noStroke();
     rectMode(CORNER); 
     rect(140,20,200,45);//Borra lectura anterior 
     h = value[1];
  
  
     //Grafica SPO2  
     flagTemp = true;
     
     fill(verde, 255);
     rect(460,50,60,25);
     fill (0,0,255);
     textSize(20);
     text(value[0] + "°C",460,68);
     textSize(12);
     
     //text(value[5], 460, 68);
     println("SPO2 :", value[5]);
     println("Pulso Cardiaco: ", value[4]);
     if (value[5] != -999){
           g.puntosH(x, value[5], pH);
       }
  
     pH = false;
     
     
     //Grafica de Temperatura corporal
     fill(verde, 255);
     rect(460,290,135,25);
     fill (0,0,255);
     textSize(15);
     text(value[5] + "%  | " + value[4] + "ppm",460,310);
     textSize(12);
     println("Temperatura corporal:", value[0]);
     g.puntosT(x, value[0], pH);
 
     x = x + 5;
     println("Calorias: ", value[3]);
     println("Velocidad: ", value[1]);
     println("Distancia: ", value[2]);
     println(" ");
     if (x > ancho - 60) {
        x = 60;
        pT = true;
        pH = true;
        g.borra();
        g.cuadricula1();
        g.cuadricula2();
              
     }
     
     text("KCALORIAS QUEMADAS", 775, 150);
      fill(verde, 255);
      rect(800, 160, 60, 25);
      fill (0,0,255);
      textSize(20);
      text(value[3], 800, 180);
      textSize(12);
           
      translate(width/1.2, height/2);
      stroke(naranja);
      strokeWeight(8);
      fill(rojo);
      beginShape();
      for(float a = 0; a < TWO_PI; a += 0.01){
         float r = 9;
         float x = r * 16 * pow(sin(a), 3);
         float y = -r * (13*cos(a) -5*cos(2*a) -2*cos(3*a) -cos(4*a));
         vertex(x, y);
      }
      endShape();
      strokeWeight(1);
     
    
     PostRequest post = new PostRequest("http://127.0.0.1:3000/datos");
     post.addData("temperatura", str(value[0]));
     post.addData("velocidad", str(value[1]));
     post.addData("distancia", str(value[2]));
     post.addData("calorias", str(value[3]));
     post.addData("pulso", str(value[4]));
     post.addData("oxigeno", str(value[5]));
     post.send();
     
     
     
     
    // text("    ", 460, 68);
     delay(1000);
 
      // background(255);
      //ps.addParticle();
      //ps.run();
    }
     //calorias
    
     
}
