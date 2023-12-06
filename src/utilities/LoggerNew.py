'''
Author: Blake Miller and Zachary Flahaut
Date: 2023-12-05
Description: Data logging script with Arduino communication. Reads data from a serial port, processes it, and stores
             it in two CSV files ('data.csv' for current data, 'total_data.csv' for cumulative data). The script runs
             for a specified time, resets the current data file at regular intervals, and removes duplicate zero rows
             from the cumulative data.

'''

import os
import serial
import csv
import pandas as pd
import numpy as np
import time
import math

def clear_csv_file(file_path):
    with open(file_path, 'w', newline='') as csv_file:
        # Truncate the file, removing all existing content
        csv_file.truncate()
        
def remove_duplicate_zero_rows(arr):
    non_zero_rows = [row for row in arr if not np.all(row == 0)]
    return np.array(non_zero_rows)

# Replace 'port' with the actual port your Arduino is connected to
ser = serial.Serial(port="COM6", baudrate=9600)
# set the start time
start = time.time()
# set time to stop reading in data
cols = ["time", "Strain_pin01", "Strain_pin05", "Status"]
i = 0
total_count = 0
set_count = 0
reset_interval = 20  # sets
maxTime = 60  # seconds
# Array sizes for current and total data storage
S = (0, len(cols))
S_total = (maxTime, len(cols))
# base storage array, gets rewrote every 10 seconds
DF = np.zeros(S)
# background whole storage
DF_total = np.zeros(S_total)

folder_path = './src/screens/'

csv_file_path = os.path.join(folder_path, 'data.csv')
total_csv_file_path = os.path.join(folder_path, 'total_data.csv')

clear_csv_file(csv_file_path)
clear_csv_file(total_csv_file_path)

# Check if 'total_data.csv' exists, and create it with the header if not
if not os.path.isfile(total_csv_file_path):
    with open(total_csv_file_path, 'w', newline='') as total_csv_file:
        total_csv_writer = csv.writer(total_csv_file)
        total_csv_writer.writerow(cols)

while (time.time() - start) < maxTime:
    # Now read in the data
    d = ser.readline().decode('utf-8')
    print(d)
    data = d.split(',')

    try:
        # Convert data to integers
        values = list(map(int, data))
        values[0] = math.ceil(time.time()-start)

        # Print the values (optional)
        print(values)
        
        # Append values to the total data storage array
        DF_total = np.vstack([DF_total, values])

        # Append values to the current data storage array
        DF = np.vstack([DF, values])

        # Write values to 'data.csv' file which updates the graph continuously
        with open(csv_file_path, 'a', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerows([values])
        
        set_count += 1
        
        if set_count >= reset_interval:
            # Reset the set count and close the 'data.csv' file
            set_count = 0
            clear_csv_file(csv_file_path)
            with open(csv_file_path, 'a', newline='') as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerow(cols)

    except ValueError as e:
        # in case a data set inputted is not a number
        print(f"Error converting values to integers: {e}")
    except KeyboardInterrupt:
        # to be able to override the loop if the participant finishes the task before the time limit
        print("Data logging stopped.")
        break

# Remove duplicate zero rows from the total_data array
DF_total = remove_duplicate_zero_rows(DF_total)

# Write all values to 'total_data.csv' file
with open(total_csv_file_path, 'a', newline='') as total_csv_file:
    total_csv_writer = csv.writer(total_csv_file)
    total_csv_writer.writerow(cols)
    total_csv_writer.writerows(DF_total)

# Close the serial port
ser.close()