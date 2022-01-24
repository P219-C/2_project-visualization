d3.json("/API/countries_earthquakes").then(function(data) {
const Country = [...new Set(data.map(item => item.CountryName))];

  console.log(Country)
  
  // var Earthquakes = data.dataset.Magnitude;
  
  // // create the Trace
  // var trace1 = {
  //   x: Earthquakes,
  //   y : Country,
  //   type: "bar"
  // }
  // // Create the data array for the plot
  // var data = [trace1];
  
  // // Define the plot layout
  // var layout = {
  //   title: "Country vs Earthquake",
  //   xaxis: { title: " Number of Earthquakes" },
  //   yaxis: { title: "Country " }
  // };
  
  // // Plot the chart to a div tag with id "bar-plot"
  // Plotly.newPlot("bar-plot", data, layout);






};