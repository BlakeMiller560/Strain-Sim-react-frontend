import os
import serial
import csv
import pandas as pd
import numpy as np
import time

# Replace 'port' with the actual port your Arduino is connected to
ser = serial.Serial(port="COM3", baudrate=9600)
# set the start time
start = time.time()
# set time to stop reading in data
cols = ["time", "Strain_pin01", "Strain_pin05", "Status"]
i = 0
total_count = 0
maxTime = 100  # seconds
# Array sizes for current and total data storage
S = (0, len(cols))
S_total = (maxTime, len(cols))
# base storage array, gets rewrote every 10 seconds
DF = np.zeros(S)
# background whole storage
DF_total = np.zeros(S_total)

folder_path = './src/screens/'

csv_file_path = os.path.join(folder_path, 'total_data.csv')
with open(csv_file_path, 'w', newline='') as csv_file:
    csv_writer = csv.writer(csv_file)
    
    # Write header to CSV file
    csv_writer.writerow(cols)

    while (time.time() - start) < maxTime:
        # Now read in the data
        d = ser.readline().decode('utf-8')
        print(d)
        data = d.split(',')
        
        try:
            # Convert data to integers
            values = list(map(int, data))

            # Print the values (optional)
            print(values)

            # Append values to the current data storage array
            DF = np.vstack([DF, values])
            DF.to_csv('data')
            
            # Write values to CSV file
            csv_writer.writerows(DF)
                    
            # Reset the current data storage array
            DF = np.zeros(S)

            # Write values to CSV file
            # csv_writer.writerow(values)

        except ValueError as e:
            # in case an data set inputted is not an number
            print(f"Error converting values to integers: {e}")
        except KeyboardInterrupt:
            # to be able to overide the loop if participant finishes task before time limite
            print("Data logging stopped.")
            break

# Close the serial port
ser.close()