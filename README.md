# Project #2: Visualize Me, Captain!
# Earthquake data analysis

![Earthquakes](.\static\images\pacific-ring-of-fire.jpg)

## Purpose and Motivation
The purpose of this project is to gather earthquake GeoJSON data from the USGS and HDRO API, create and explore interactive maps of earthquakes around the world that tracks not only the earthquakes but the magnitude as well. The map also includes pop-up information for each incident.
This project aims to build an interactive front end website using HTML CSS and javaScript.

## Solution
The earthquake data was imported, and each earthquakes position, significance and magnitude were pulled out of the dataset. At each earthquakes position, a circle element was appended to the leaflet map. Each data marker reflects the magnitude of the earthquake in its size and the significance of earthquake in its colour. Earthquakes with higher magnitudes appear larger and those with higher significance appear darker in colour. When any marker is clicked a pop-up appears providing additional information about the quake.

## Data Sources

* [ HDRO ](http://hdr.undp.org/en/content/human-development-report-office-statistical-data-api)
* [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson)

## Data Loading 

The GeoJSON files and csv files extracted from the data sources were cleaned and uploaded to SQLite database


## Analysis and Visualisation

created a RESTFUL API through a Python Flask-powered app using JavaScript, CSS, HTML & Bootstrap

### Flask app
####            app.py

![pic1](static\images\flask-pic-1.png)
![pic2](static\images\flask-pic-2.png)
![pic3](static\images\flask-pic-3.png)


## Charts

Bar Chart, Violin Chart and Scatter plots - using Plotly and D3
Heat map - using Leaflet

## Deployment to Huroku

#### Click on the link below to access the project site

[project site] ()







