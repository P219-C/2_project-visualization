-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/ujSEdL
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Countries" (
    "CountryCode" VARCHAR   NOT NULL,
    "CountryName" VARCHAR   NOT NULL,
    "Population" INT   NOT NULL,
    "HDI" REAL   NOT NULL,
    CONSTRAINT "pk_Countries" PRIMARY KEY (
        "CountryCode"
     )
);

CREATE TABLE "Earthquakes" (
    "EarthquakeID" INT   NOT NULL,
    "Latitude" REAL   NOT NULL,
    "Longitude" REAL   NOT NULL,
    "Depth" REAL   NOT NULL,
    "CountryCode" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Earthquakes" PRIMARY KEY (
        "EarthquakeID"
     )
);

ALTER TABLE "Earthquakes" ADD CONSTRAINT "fk_Earthquakes_CountryCode" FOREIGN KEY("CountryCode")
REFERENCES "Countries" ("CountryCode");

