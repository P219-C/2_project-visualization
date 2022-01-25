d3.json("/API/countries_earthquakes").then(function(data) {
  const Countries = [...new Set(data.map(item => item.CountryName))];
  
  console.log("test")
  
  console.log(Countries)
  
  var Countryobject = { }
  
    Countries.forEach(function(Country){
      var Earthquakes = (data).filter(function(entry){
        return (entry.CountryName === Country);
     
    });
    Countryobject[Country] = Earthquakes.length;
    } );
    console.log(Countryobject)
  
  
  // create the Trace
  var trace1 = {
    x: Object.keys(Countryobject),
    y : Object.values(Countryobject),
    type: "bar"
  }
  // Create the data array for the plot
  var data = [trace1];
  
  // Define the plot layout
  var layout = {
    title: "Country vs Earthquake",
    xaxis: { title: "Country" },
    yaxis: { title: "Number of Earthquakes" }
  };
  
  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("barplot", data, layout);
});