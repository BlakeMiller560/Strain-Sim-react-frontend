/*
Author: Blake Miller and Zachary Flahaut
Date: 2023-12-05
Description: Arduino code for a system using a strain gauge (SENSOR_PIN01) and a pressure sensor (SENSOR_PIN05).
             The code reads analog values from the sensors, checks the pressure sensor value, and controls an LED
             (connected to pin 13) based on the pressure level. The time, strain gauge value, pressure sensor value,
             and status are printed to the serial monitor.

*/

/* Strain gauge */
#define SENSOR_PIN01 A0
/* pressure sensor */
#define SENSOR_PIN05 A5

unsigned long startTime;

void setup()
{
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  startTime = millis();
}
 
/* Main loop */
void loop()
{  
  // Read analog values from the sensors
  int pin01 = analogRead(SENSOR_PIN01);
  int pin05 = analogRead(SENSOR_PIN05);

  // Check if the pressure sensor value is greater than 95% of 700 (Offset to make sure it's lower than already too strong)
  if (pin05 > (700 * 0.95))
  {
    // Turn on the LED (pin 13) if the pressure sensor value is greater than 700
    digitalWrite(13, HIGH);

    // Print the time, strain gauge value, pressure sensor value, and status (1 for high pressure)
    Serial.println(String(millis() - startTime) + "," + String(pin01) + "," + String(pin05) + "," + String(1));
  }
  else
  {
    // Turn off the LED (pin 13) if the pressure sensor value is less than or equal to 50
    digitalWrite(13, LOW);

    // Print the time, strain gauge value, pressure sensor value, and status (0 for low pressure)
    Serial.println(String(millis() - startTime) + "," + String(pin01) + "," + String(pin05) + "," + String(0));
  }

  /* Wait 0.1 second and then read again */
  delay(100);  
}
