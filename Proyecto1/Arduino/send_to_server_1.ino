void send_to_server_1(){
//we have changing variable here, so we need to first build up our URL packet
/*URL_withPacket = URL_webhost;//pull in the base URL
URL_withPacket += String(unit_id);//unit id value
URL_withPacket += "&sensor=";//unit id 1
URL_withPacket += String(sensor_value);//sensor value
URL_withPacket += payload_closer;*/

url = location_url;
url += NOOBIX_id;
url += "&un=1";
url += "&n1=";
url +=  String(sent_nr_1);//sensor value
url += "&n2=";
url +=  String(sent_nr_2);//sensor value


URL_withPacket = ""; 

URL_withPacket = (String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");




  counter=0;/
  payload_size=0;
  for(int i=0; i<(URL_withPacket.length()); i++){//using a string this time, so use .length()
    payload[payload_size+i] = URL_withPacket[i];//build up the payload
    counter++;//increment the counter
  }
  payload_size = counter+payload_size; 


   
  if(connect_ESP()){
  
    Serial.println("yes");
   
  }//connect ESP


}//connect web host
