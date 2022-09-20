boolean setup_ESP(){
  
  ESP8266.print("AT\r\n");
  if(read_until_ESP(keyword_OK,sizeof(keyword_OK),5000,0))
    Serial.println("ESP CHECK OK");
  else
    Serial.println("ESP CHECK FAILED");
  serial_dump_ESP();

   ESP8266.print("AT+RST\r\n");
  if(read_until_ESP(keyword_OK,sizeof(keyword_OK),5000,0))
    Serial.println("ESP RESET OK");
  else
    Serial.println("ESP RESET FAILED"); 
  serial_dump_ESP();

  
   ESP8266.print("AT+CWMODE=");
   ESP8266.print(CWMODE);
   ESP8266.print("\r\n");
  if(read_until_ESP(keyword_OK,sizeof(keyword_OK),5000,0))
    Serial.println("ESP CWMODE SET");
  else
    Serial.println("ESP CWMODE SET FAILED"); 
  serial_dump_ESP();  
   
   ESP8266.print("AT+CWJAP=\"");
   ESP8266.print(SSID_ESP);
   ESP8266.print("\",\"");
   ESP8266.print(SSID_KEY);
   ESP8266.print("\"\r\n");
  if(read_until_ESP(keyword_OK,sizeof(keyword_OK),10000,0))
    Serial.println("ESP SSID SET OK");
  else
    Serial.println("ESP SSID SET FAILED");   
  serial_dump_ESP();
  
 
  Serial.println("CHECKING FOR AN IP ADDRESS");
  ESP8266.print("AT+CIFSR\r\n");
  if(read_until_ESP(keyword_rn,sizeof(keyword_rn),10000,0)){
  if(read_until_ESP(keyword_rn,sizeof(keyword_rn),1000,1)){
   
    for(int i=1; i<=(scratch_data_from_ESP[0]-sizeof(keyword_rn)+1); i++)
       ip_address[i] = scratch_data_from_ESP[i];
    ip_address[0] = (scratch_data_from_ESP[0]-sizeof(keyword_rn)+1);
    Serial.print("IP ADDRESS = ");
    for(int i=1; i<=ip_address[0]; i++)
    Serial.print(ip_address[i]);
    Serial.println("");
  }}//if first \r\n
  else
  Serial.print("IP ADDRESS FAIL");
  serial_dump_ESP();

 
   ESP8266.print("AT+CIPMUX=");// set the CIPMUX
   ESP8266.print(CIPMUX);//from constant
   ESP8266.print("\r\n");
  if(read_until_ESP(keyword_OK,sizeof(keyword_OK),5000,0))//go look for keyword "OK" or "no change
    Serial.println("ESP CIPMUX SET");
  else
    Serial.println("ESP CIPMUX SET FAILED"); 
  serial_dump_ESP();


 

  
  
}//setup ESP
