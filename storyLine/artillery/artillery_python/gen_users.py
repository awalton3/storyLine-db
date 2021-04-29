#!/usr/bin/env python3

import csv

with open('../artillery_csv/users.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    for i in range(60000000):  # Make this smaller!
        writer.writerow([f'test{i}@test', f'test{i}', f'test{i}'])
