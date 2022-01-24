// For Output format check the original source https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
// console.log(queryUrl)   // Uncomment to print the URL in console

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

d3.json("/API/countries_earthquakes").then(function(data) {
    console.log(data);   // Uncomment to print the full dataset in console


    // ************ Code to test the dataset. It prints the location name of the earthquake"
    // var fullCountries=[];
    // data.features.forEach(earthquake =>{
    //     // console.log(earthquake.properties.place);
    //     var location = earthquake.properties.place.split(",");
    //     fullCountries.push(location.pop());
    // });
    // var uniqueCountries = fullCountries.filter(onlyUnique);
    // console.log(uniqueCountries);
    // *****************************************************************


});