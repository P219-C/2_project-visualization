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


@app.route('/visualisations')
def visualisations():
    return render_template("visualisations.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route("/API")
def api():
    return render_template("data.html")


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