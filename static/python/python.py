# FOR HDI: http://ec2-54-174-131-205.compute-1.amazonaws.com/API/Information.php
# Human development classification
# HDI classifications are based on HDI fixed cutoff points, which are derived from the quartiles of dis
# tributions of the component indicators. The cutoffpoints are HDI of less than 0.550 for low human development,
#  0.550–0.699 for medium human development, 0.700–0.799 for high human development and 0.800 or greater 
#  for very high human development.

import json
from turtle import back
import requests


url_HDRO = "http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137506,44206/year=2019"
url_USGS = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

response_HDRO = requests.get(url_HDRO)
print(f"HDRO: {response_HDRO}")
response_USGS = requests.get(url_USGS)
print(f"USGS: {response_USGS}")

data_HDRO = response_HDRO.json()
# print(json.dumps(data_HDRO, indent=4, sort_keys=True))
data_USGS = response_USGS.json()


# Import SQL Alchemy
from sqlalchemy import create_engine

# Import module to create relationship patterns
from sqlalchemy.orm import relationship

# Import and establish Base for which classes will be constructed
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

# Import modules to declare columns and column data types
from sqlalchemy import Table, Column, Integer, String, Float, BigInteger



# Create classes:
# Countries & Earthquakes

class Countries(Base):  #Parent
    __tablename__ = 'countries'
    id = Column(Integer, primary_key=True)
    CountryCode = Column(String(255))
    CountryName = Column(String(255))
    Population = Column(Float)  # Millions
    HDIndex = Column(Float) # Index
    # children = relationship("Earthquakes", back_populates="parent")

class Earthquakes(Base):    #Child
    __tablename__ = 'earthquakes'
    id = Column(Integer, primary_key=True)
    EarthquakeID = Column(String(255))
    Latitude = Column(Float)
    Longitude = Column(Float)
    Depth = Column(Float)
    DateTime = Column(BigInteger)
    CountryCode = Column(String(255))   # Foreign Key?
    # parent_id = Column(Integer, ForeignKey('countries.CountryCode'))
    # parent = relationship("Countries", back_populates="children")


# print(data_USGS["features"])

# Create Database Connection
# ---------------------------
# Establish Connection
engine = create_engine("sqlite:///project2.sqlite")
conn = engine.connect()

# Create Countries and Earthquakes tables within the database
Base.metadata.create_all(conn)

# To push the objects made and query the server we use a Session object
from sqlalchemy.orm import Session
session = Session(bind=engine)

i=1
# Create specific instances of the Countries and Earthquakes classes
for earthquake in data_USGS["features"]:

    # print(earthquake["id"], earthquake["geometry"]["coordinates"][0], earthquake["geometry"]["coordinates"][1], earthquake["geometry"]["coordinates"][2], earthquake["properties"]["time"])
    new_earthquake = Earthquakes(EarthquakeID=earthquake["id"], Longitude=earthquake["geometry"]["coordinates"][0], Latitude=earthquake["geometry"]["coordinates"][1], Depth=earthquake["geometry"]["coordinates"][2], DateTime=earthquake["properties"]["time"])

    # Add new_earthquake to the current session
    session.add(new_earthquake)
    # Add new_country to the current session

    # Commit objects to the database
    session.commit()
    print(i)
    i = i+1






earthquake_list = session.query(Earthquakes)
for earthquake in earthquake_list:
    print(earthquake.EarthquakeID)



# print(json.dumps(data_USGS, indent=4, sort_keys=True))
# Earthquakes
# -
# EarthquakeID PK INT
# Latitude REAL
# Longitude REAL
# Depth REAL

# Countries
# -
# CountriesID PK INT
# EarthquakeID FK -< Earthquakes.EarthquakeID
# Name VARCHAR
# Population INT
# HDI REAL