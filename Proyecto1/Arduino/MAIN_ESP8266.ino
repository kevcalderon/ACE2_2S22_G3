//Include the needed library, we will use softer serial communication with the ESP8266
#include <SoftwareSerial.h>
#include <avr/power.h>

int voltaje;
int AnalogPin = A0; 
int conteo;
int tiempo;

//Define the used
#define ESP8266_RX 10  //Connect the TX pin from the ESP to this RX pin of the Arduino
#define ESP8266_TX 11  //Connect the TX pin from the Arduino to the RX pin of ESP





const char SSID_ESP[] = "CLARO1_DCABF4";        
const char SSID_KEY[] = "2745PsDoLS";             
const char* host = "arqui2grupo32s.000webhostapp.com"; 
String NOOBIX_id = "1";                     
String NOOBIX_password = "12345";             
String location_url = "/TX.php?id=";          
                                              





//Used variables in the code
String url = "";
String URL_withPacket = "";    
unsigned long multiplier[] = {1,10,100,1000,10000,100000,1000000,10000000,100000000,1000000000};
//MODES for the ESP
const char CWMODE = '1';//CWMODE 1=STATION, 2=APMODE, 3=BOTH
const char CIPMUX = '1';//CWMODE 0=Single Connection, 1=Multiple Connections


//Define the used functions later in the code, thanks to Kevin Darrah, YT channel:  https://www.youtube.com/user/kdarrah1234
boolean setup_ESP();
boolean read_until_ESP(const char keyword1[], int key_size, int timeout_val, byte mode);
void timeout_start();
boolean timeout_check(int timeout_ms);
void serial_dump_ESP();
boolean connect_ESP();
void connect_webhost();
unsigned long timeout_start_val;
char scratch_data_from_ESP[20];//first byte is the length of bytes
char payload[200];
byte payload_size=0, counter=0;
char ip_address[16];


//Variable to SEND to the DATABASE
bool sent_bool_1 = 0;
bool sent_bool_2 = 0;
bool sent_bool_3 = 0;
float  sent_nr_1 = 0;
int  sent_nr_2 = 0;
int  sent_nr_3 = 0;
int  sent_nr_4 = 0;
int  sent_nr_5 = 0;

//Variable RECEIVED from the DATABASE
bool received_bool_1 = 0;
bool received_bool_2 = 0;
bool received_bool_3 = 0;
bool received_bool_4 = 0;
bool received_bool_5 = 0;
int  received_nr_1 = 0;
int  received_nr_2 = 0;
int  received_nr_3 = 0;
int  received_nr_4 = 0;
int  received_nr_5 = 0;
String received_text = "";






//Store received chars in this variables
char t1_from_ESP[5];  //For time from web
char d1_from_ESP[2];  //For received_bool_2
char d2_from_ESP[2];  //For received_bool_2
char d3_from_ESP[2];  //For received_bool_3
char d4_from_ESP[2];  //For received_bool_4
char d5_from_ESP[2];  //For received_bool_5
char d9_from_ESP[6];  //For received_nr_1
char d10_from_ESP[6]; //For received_nr_2
char d11_from_ESP[6]; //For received_nr_3
char d12_from_ESP[6]; //For received_nr_4
char d13_from_ESP[6]; //For received_nr_5
char d14_from_ESP[300]; //For received_text 


//DEFINE KEYWORDS HERE
const char keyword_OK[] = "OK";
const char keyword_Ready[] = "Ready";
const char keyword_no_change[] = "no change";
const char keyword_blank[] = "#&";
const char keyword_ip[] = "192.";
const char keyword_rn[] = "\r\n";
const char keyword_quote[] = "\"";
const char keyword_carrot[] = ">";
const char keyword_sendok[] = "SEND OK";
const char keyword_linkdisc[] = "Unlink";

const char keyword_t1[] = "t1";
const char keyword_b1[] = "b1";
const char keyword_b2[] = "b2";
const char keyword_b3[] = "b3";
const char keyword_b4[] = "b4";
const char keyword_b5[] = "b5";
const char keyword_n1[] = "n1";
const char keyword_n2[] = "n2";
const char keyword_n3[] = "n3";
const char keyword_n4[] = "n4";
const char keyword_n5[] = "n5";
const char keyword_n6[] = "n6";
const char keyword_doublehash[] = "##";


SoftwareSerial ESP8266(ESP8266_RX, ESP8266_TX);// rx tx



void setup(){//        SETUP     START
 
  
  //Pin Modes for ESP TX/RX
  pinMode(ESP8266_RX, INPUT);
  pinMode(ESP8266_TX, OUTPUT);
  
  
  

  
  ESP8266.begin(9600);//default baudrate for ESP
  ESP8266.listen();//not needed unless using other software serial instances
  Serial.begin(9600); //for status and debug
  
  delay(2000);//delay before kicking things off
  setup_ESP();//go setup the ESP 
 
}




void loop(){
  
  int lectura =analogRead(AnalogPin);
  Serial.println(lectura);
  if(lectura>600&&lectura<700){
    sent_nr_1=1/2.2;  
  }else if(lectura>500&&lectura<600){
    sent_nr_1=2/2.2;  
  }else if(lectura>400&&lectura<500){
    sent_nr_1=3/2.2;  
  }else if(lectura>300&&lectura<400){
    sent_nr_1=5/2.2;  
  }else if(lectura>200&&lectura<300){
    sent_nr_1=7/2.2;  
  }else if(lectura>100&&lectura<200){
    sent_nr_1=9/2.2;  
  }else if(lectura>50&&lectura<100){
    sent_nr_1=12/2.2;  
  }else if(lectura<50){
    sent_nr_1=15/2.2;  
  }if(lectura>700){
    sent_nr_1=0;  
  }

  
//Serial.print("Lectura Analogica = ");
//Serial.println(sent_nr_1);

  if(tiempo!=15){
    if(sent_nr_1>0){
      conteo++;
    }
  }else if(tiempo==15){
    sent_nr_2 = conteo*4;
    conteo=0;
    tiempo=0;
  }
  //Serial.print("time ");
  //Serial.println(tiempo);
  //Serial.print("velocidad= ");
  //Serial.println(sent_nr_2);
  send_to_server_1(); 
  

  tiempo++;  
  Serial.println("pegar");
  delay(100);

}//End of the main loop
