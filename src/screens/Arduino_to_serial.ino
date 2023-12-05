#include <SoftwareSerial.h>

/* Strain gauge */
#define SENSOR_PIN01 A0
/* pressure sensor */
#define SENSOR_PIN05 A5
/* RX, TX pins for software serial communication */
SoftwareSerial BTSerial(2, 3);
unsigned long startTime;

void setup()
{
  Serial.begin(9600);
  BTSerial.begin(9600);
  pinMode(12,OUTPUT);
  //Serial.print("time,pin01,pin05,Status");
  startTime = millis();
}
 
/* Main loop */
void loop()
{  
  pin01 = analogRead(SENSOR_PIN01);
  pin05 = analogRead(SENSOR_PIN05);
  //Serial.print("Sensor_A0: ");
  //Serial.println(pin01);
  //Serial.print("Sensor_A5: ");
  //Serial.println(pin05);
  if (pin05 > (700*0.95)){ //Offset to make sure its lower then already too strong
   digitalWrite(12, HIGH); // Turn on the LED if the sensor value is greater than 700
   Serial.println(str(millis()-startTime) + "," + str(pin01) + "," + str(pin05) + ",HIGH");
  } else {
    digitalWrite(12, LOW); // Turn off the LED if the sensor value is less than or equal to 50
    Serial.println(str(millis()-startTime) + "," + str(pin01) + "," + str(pin05) + ",LOW");
  }
  /* Wait 0.1 second and then read again */
  delay(100);
}
