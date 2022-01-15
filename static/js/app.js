var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
console.log(queryUrl)

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

d3.json(queryUrl).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data);
    var fullCountries=[];
    data.features.forEach(earthquake =>{
        // console.log(earthquake.properties.place);
        var location = earthquake.properties.place.split(",");
        fullCountries.push(location.pop());

    });

    var uniqueCountries = fullCountries.filter(onlyUnique);
    console.log(uniqueCountries);
});