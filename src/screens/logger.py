import serial
import pandas as pd
import time

# Replace 'port' with the actual port your Arduino is connected to
ser = serial.Serial(port='/dev/cu.usbmodem144101', baudrate=9600)

# Create or open a text file for writing data
with open('data.txt', 'w') as file:
    # create a time stamp to then use to compare for max allowed data collection time
    start = time.time()
    try:
        while True:
            # Read data from the Arduino's serial output
            # print(ser.readline())
            # remove the last 2 characters and then decode the utf-8 into a string then saved in data
            data = ser.readline()[:-1].decode('utf-8')

            # Print data to the console
            print(data)

            # Write data to the text file
            file.write(data)
            if (time.time() - start) >= 180:
                break
    except KeyboardInterrupt:
        print("Data logging stopped.")
        ser.close()

# export data into a csv file as well
# these lines can be removed if needed
read = pd.read_csv("data.txt")
read.to_csv("data.csv", index=None)

