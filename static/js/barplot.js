var Country = ["South Korea", "Canada", "United Kingdom", "Netherlands", "Italy",
"France", "Japan", "United States", "China", "Germany"];

var Earthquakes = [1500,2500,1300,1450,650,700,850,1200,900,850];

// create the Trace
var trace1 = {
  x: Earthquakes,
  y : Country,
  type: "bar"
}
// Create the data array for the plot
var data = [trace1];

// Define the plot layout
var layout = {
  title: "Country vs Earthquake",
  xaxis: { title: " Number of Earthquakes" },
  yaxis: { title: "Country " }
};

// Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot("bar-plot", data, layout);



    