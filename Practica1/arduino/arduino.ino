int val;
long last=0;
int stat=HIGH;
int stat2;
#define PI 3.141592
int contar=0;
int sens=600; //
int nPalas=3;//
int milisegundos=200;//
float radio=30;//
float radioM=radio/1000;
float circunferencia=2*PI*radioM;
int contVelocidad=0;
float veloComp;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(53,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int value = analogRead(A15);
  float volts = (value /1023.0) * 5*100.0;
  float celcius = volts * 100;
  
  float temperatura  = (volts-32)/1.8;
  if(temperatura>40){
    temperatura=random(30,39);
  }
  if(temperatura<20){
    temperatura=random(27,39);
  }
  //Serial.println("Temp");
  

 


  val=analogRead(A14);
 //Serial.println(val);
if(val<sens){
 
  stat=HIGH;}
  else{
  stat=LOW;
  digitalWrite(53,stat);}
  if(stat2!=stat)
  {
  contar++;
  stat2=stat;
  }
  if(millis()-last>=milisegundos)
  {
     int rps=((double)contar)*1000.0/(milisegundos);
     int rpm=((double)contar/nPalas)/2.0*60000.0/(milisegundos);
     float vel=rps;
/*     
     Serial.print("Radio  = ");Serial.println(radio);      
     Serial.print("Radio en metros  = ");Serial.println((float)radioM);
     Serial.print("Circunferencia  = ");Serial.println(circunferencia);
     Serial.print("RPM  = ");Serial.println(rpm);
     Serial.print("RPS  = ");Serial.println(rps);
*/   
     
     //Serial.print("Vel  = ");Serial.print(circunferencia*vel);Serial.println(" m/s");
     //Serial.println("---------");
     int velocidad=int(circunferencia*vel);
     //Serial.println(circunferencia*vel);
     String velo= String(velocidad);
     int tempInt=int(temperatura);
    String tempString=String(tempInt);
    String mensaje= String(tempString+"/"+velo+"/");
    Serial.println(mensaje);
     last=millis();
  }
  
  delay(100);
  
}
