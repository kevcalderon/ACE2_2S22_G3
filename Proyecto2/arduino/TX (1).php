<?php
/*This file should receive a link somethong like this: http://noobix.000webhostapp.com/TX.php?unit=1&b1=1
If you paste that link to your browser, it should update b1 value with this TX.php file. Read more details below.
The ESP will send a link like the one above but with more than just b1. It will have b1, b2, etc...
*/

//We loop through and grab variables from the received the URL
foreach($_REQUEST as $key => $value)  //Save the received value to the hey variable. Save each cahracter after the "&"
{
	//Now we detect if we recheive the id, the password, unit, or a value to update
if($key =="id"){
$unit = $value;
}	
if($key =="pw"){
$pass = $value;
}	
if($key =="un"){
$update_number = $value;
}
	
if($update_number == 1)
{
	if($key =="n1"){
		$sent_nr_1 = $value;
	}
	if($key =="n2"){
	$sent_nr_2 = $value;
	}
	if($key =="n3"){
	$sent_nr_3 = $value;
	}
	if($key =="n4"){
	$sent_nr_4 = $value;
	}
}
else if($update_number == 2)
{
	if($key =="n2"){
	$sent_nr_2 = $value;
	}			
}
else if($update_number == 3)
{
	if($key =="n3"){
	$sent_nr_3 = $value;
	}			
}
else if($update_number == 4)
{
	if($key =="n4"){
	$sent_nr_4 = $value;
	}			
}	
	
else if($update_number == 5)
	{
	if($key =="b6"){
	$sent_bool_1 = $value;
	}	
	if($key =="b7"){
	$sent_bool_2 = $value;
	}	
	if($key =="b8"){
	$sent_bool_3 = $value;
	}	
}
}//End of foreach


include("database_connect.php"); 	//We include the database_connect.php which has the data for the connection to the database


// Check  the connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
//Now we update the values in database
if($update_number == 1)	//If the received data is for SENT_NUMBER_1, we update that value
	{
		mysqli_query($con,"UPDATE sensorTemp SET fuerzaImpulsoInicial = $sent_nr_1 ,fuerzaImpulsoFinal=$sent_nr_2 , velocidadImpulso=$sent_nr_3 , peso=$sent_nr_4 WHERE id=1");	
	}

?>








