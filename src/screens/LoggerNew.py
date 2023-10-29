import serial
import csv
import pandas as pd
import numpy as np
import time

# Replace 'port' with the actual port your Arduino is connected to
ser = serial.Serial(port='/dev/cu.usbmodem143101', baudrate=9600)
# set the start time
start = time.time()
# set time to stop reading in data
Cols = ["Time","Strain"]
i = 0
S = (10,2)
DF = np.zeros(S)
file = open('data.txt', 'w')

while (time.time() - start) < 360:
    # now read in the data
    d = ser.readline().decode('utf-8')
    comma_str = ','
    commaLoc = d.find(comma_str)
    #print(i)
    #print(commaLoc)
    data1 = int(d[0:commaLoc])
    data2 = int(d[commaLoc+1:-2])


    #np.append(DF,[data1,data2],axis=0)
    DF[i][0] = data1
    DF[i][1] = data2
    print(DF)
    i = i + 1
    if i % 10 == 0:

        i = 0
        print('apple')
        #DF = DF.astype(int)
        # convert to int
        DF2 = (np.rint(DF)).astype(int)
        # add columns
        DF3 = pd.DataFrame(DF2, columns=Cols).astype(int)
        DF3.to_csv('data.csv')


        #np.savetxt("data.csv", DF3, delimiter=",")
        DF = np.zeros(S)