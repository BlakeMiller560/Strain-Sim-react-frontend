/* Strain gauge */
#define SENSOR_PIN01 A0
/* pressure sensor */
#define SENSOR_PIN05 A5

unsigned long startTime;

void setup()
{
  Serial.begin(9600);
  pinMode(13,OUTPUT);
  startTime = millis();
}
 
/* Main loop */
void loop()
{  
  int pin01 = analogRead(SENSOR_PIN01);
  int pin05 = analogRead(SENSOR_PIN05);
  if (pin05 > (700*0.95)){ //Offset to make sure its lower then already too strong
   digitalWrite(13, HIGH); // Turn on the LED if the sensor value is greater than 700
   Serial.println(String(millis()-startTime) + "," + String(pin01) + "," + String(pin05) + "," + String(1));
  } else {
    digitalWrite(13, LOW); // Turn off the LED if the sensor value is less than or equal to 50
    Serial.println(String(millis()-startTime) + "," + String(pin01) + "," + String(pin05) + "," + String(0));
  }
  /* Wait 0.1 second and then read again */
  delay(100);  
}
