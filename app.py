from flask import Flask, render_template
from sqlalchemy import create_engine
import pandas as pd

#Database setup
db_name="project2_completeDB"
db_string = f"sqlite:///data/python/{db_name}.sqlite"



# Flask app setup
app = Flask(__name__)

# Set route
@app.route('/')
def index():
    return render_template("index.html")

@app.route("/API")
def api():

    available_API = """
    <a href="/API/countries"><strong>/API/countries</strong></a>
    <p>Description: Json file with information of the countries:</p>
    <p><ul>
        <li>Country Code (to link to the earthquake table)</li>
        <li>Country Name</li>
        <li>Total Population (millions)</li>
        <li>HDI</li>
    </ul></p>
    <a href="/API/earthquakes"><strong>/API/earthquakes</strong></a>
    <p>Description: Json file with information of the earthquakes:</p>
    <p><ul>
        <li>USGS Earthquake ID</li>
        <li>Longitude</li>
        <li>Latitude</li>
        <li>Depth</li>
        <li>Timestamp</li>
        <li>Magnitude</li>
        <li>Country Code (to link to the country json file)</li>
    </p></ul>
    <a href="/API/countries_earthquakes"><strong>/API/countries_earthquakes</strong></a>
    <p>Description: An INNER JOIN of the countries and earthquakes table through the country code (earthquakes.country_id=countries.CountryCode)</p>
    """

    return available_API


@app.route("/API/countries")
def countries():

    engine = create_engine(db_string)

    # Connecting to the db
    conn = engine.connect()
    countries_sql = pd.read_sql("SELECT * FROM countries", conn)

    countries_json = countries_sql.to_json(orient="records")

    # d3.json("/API/countries").then()
    return countries_json


@app.route("/API/earthquakes")
def earthquakes():

    engine = create_engine(db_string)

    # Connecting to the db
    conn = engine.connect()
    earthquakes_sql = pd.read_sql("SELECT * FROM earthquakes", conn)

    earthquakes_json = earthquakes_sql.to_json(orient="records")

    # d3.json("/API/earthquakes").then()
    return earthquakes_json

@app.route("/API/countries_earthquakes")
def countries_earthquakes():

    engine = create_engine(db_string)

    conn = engine.connect()
    countries_earthquakes_sql = pd.read_sql("SELECT * FROM countries INNER JOIN earthquakes ON earthquakes.country_id=countries.CountryCode", conn)

    countries_earthquakes_json = countries_earthquakes_sql.to_json(orient="records")


    return countries_earthquakes_json





if __name__ == '__main__':
    app.run(debug=True)