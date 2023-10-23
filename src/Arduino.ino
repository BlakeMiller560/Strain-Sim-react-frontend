/* Strain gauge */
#define SENSOR_PIN01 A0
/* pressure sensor */
#define SENSOR_PIN05 A5

void setup()
{
  Serial.begin(9600);
}
 
/* Main loop */
void loop()
{  
  Serial.print("Sensor_A0: ");
  Serial.println(analogRead(SENSOR_PIN01));
  Serial.print("Sensor_A5: ");
  Serial.println(analogRead(SENSOR_PIN05));
 
  /* Wait 1 second and then read again */
  delay(1000);
}
