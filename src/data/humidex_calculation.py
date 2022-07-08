#!/usr/bin/python3
"""
Usage: preprocess.py <input_filepath> <output_filepath>

Calculate humidex for each data entry, remove invalid data entries
Output data format:
    timestamp, light (lux), temperature (deg C), relative humidity (%), humidex
"""


# sensor data
# datetime, lux, temp, humidity, humidex

# enviro rating - f(t, h, l) ---------- correlate w/ user rating

# user data - 5 day range 4/6 - thursday
# date, user_rating (avg of likert scale)

# class avg - avg user rating (daily)


import csv
import sys
import os.path
import math


def get_humidex(T, RH):
    """
    formula sources:
        https://en.wikipedia.org/wiki/Humidex
        https://en.wikipedia.org/wiki/Dew_point
    """
    a = 6.1121
    b = 18.678
    c = 257.14
    d = 234.5

    T_dew_point = c*(math.log(RH/100) + ((b*T)/(c+T))) / (b-(math.log(RH/100) + ((b*T)/(c+T))))

    humidex = T + 5/9*(6.11 * math.exp(5417.7530*((1/273.16)-(1/(273.15+T_dew_point)))) - 10)

    return humidex


def process(input_filepath, output_filepath):

    output_data = []

    # input data format:
    #   timestamp, light (lux), light status, temperature (deg C),
    #   relative humidity (%), temperature/humidity status
    TIMESTAMP = 0
    LIGHT = 1
    LIGHT_STATUS = 2
    TEMP = 3
    RH = 4
    TEMP_RH_STATUS = 5

    OK_STRING = "ok"

    with open(input_filepath, mode='r') as input_file:
        csv_reader = csv.reader(input_file)
        rows = list(csv_reader)

        for row in rows:
            if row[LIGHT_STATUS].strip() != OK_STRING or row[TEMP_RH_STATUS].strip() != OK_STRING:
                continue

            humidex = get_humidex(float(row[TEMP].strip()), float(row[RH].strip()))
            output_data.append([row[TIMESTAMP].strip(), row[LIGHT].strip(), row[TEMP].strip(), row[RH], humidex])

    with open(output_filepath, mode='w') as output_file:
        csv_writer = csv.writer(output_file)

        # add header
        csv_writer.writerow(["timestamp", "light (lux)", "temperature (deg C)", "relative humidity (%)", "humidex"])
        csv_writer.writerows(output_data)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("missing command line argument: <input_filepath> <output_filepath>")
        sys.exit(1)

    input_filepath = sys.argv[1]
    output_filepath = sys.argv[2]

    if not os.path.isfile(input_filepath):
        print(f"error: file '{input_filepath}' could not be found")
        sys.exit(1)

    process(input_filepath, output_filepath)