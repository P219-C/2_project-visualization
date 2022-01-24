// Bubble chart to show Top 25 Highest Magnitudes vs location
// Top 25 earthquakes with largest Depth of earthquake vs magnitude
// Signicance (Value is determing by a number of factors eg mag, max MMI, reports and estimated impact) vs mag


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Fetching the data for the scatterplot
d3.json(url).then(data => {

    // Initial scatter plot: Magnitude Vs Location
    var sortedMag= data.features.sort((a,b) => {
        return b.properties.mag - a.properties.mag;
    });
    
    var top_25Mag = sortedMag.slice(0,25);
    // console.log(top_25Mag)
    
   Object.values(top_25Mag).forEach(row => {
        console.log(row.properties.place)
    });
    // console.log(circle)

    // Location Vs Magnitude ScatterPlot
    function getRadius(magnitude) {
        if (magnitude === 0) {
          return 1;
        }
        return magnitude * 6;
      }
    
    // var location= Object.values(top_25Mag)
    // location.forEach(row => {
    //     bubble_trace.append().text(`Place: ${row.properties.place}`)
    // });

    var bubble_trace = {
        x:top_25Mag.map(row => row.geometry.coordinates[1]),
        y:top_25Mag.map(row => row.geometry.coordinates[0]),
        mode: "markers",
        text: location,
        marker: {
            size: top_25Mag.map(row => getRadius(row.properties.mag))
        }
    };

    // var location= Object.values(top_25Mag)
    // location.forEach(row => {
    //     bubble_trace.append().text(`Place: ${row.properties.place}`)
    // });

    var bubble_data = [bubble_trace];

    var bubble_layout = {
        title: "Magnitude Vs Location",
        yaxis: {title: "Longitude"},
        xaxis: {title: "Latitude"},
        height: 500,
        width: 700
        };

        Plotly.newPlot("scatter",bubble_data,bubble_layout);


     // Event Listener on dropdown 
     d3.select("#selectOption").on("change", () =>{
        var element = d3.select("#selectOption");
        var value = d3.select("#selectOption").property("value");
    
        if (value == 'location'){
            // Sorted by top 25 Magitudes
            var sortedMag= data.features.sort((a,b) => {
            return b.properties.mag - a.properties.mag;
        });
        
            var top_25Mag = sortedMag.slice(0,25);

            // Location Vs Magnitude ScatterPlot
            function getRadius(magnitude) {
                if (magnitude === 0) {
                  return 1;
                }
                return magnitude * 6;
              }
            
            var bubble_trace = {
                x:top_25Mag.map(row => row.geometry.coordinates[1]),
                y:top_25Mag.map(row => row.geometry.coordinates[0]),
                mode: "markers",
                marker: {
                    size: top_25Mag.map(row => getRadius(row.properties.mag))     
                }
            };

            var bubble_data = [bubble_trace];

            var bubble_layout = {
                title: "Magnitude Vs Location",
                yaxis: {title: "Longitude"},
                xaxis: {title: "Latitude"},
                height: 500,
                width: 700
                };
        
        } else if (value == "depth"){
            // Sorted by top 25 Depth
            var sortedDept= data.features.sort((a,b) => {
            return b.geometry.coordinates[2] - a.geometry.coordinates[2];
        });
        
            var top_25Dept = sortedDept.slice(0,25);

            // Bubble chart for Magnitude Vs Depth
            var bubble_trace = {
                x:top_25Dept.map(row => row.geometry.coordinates[2]),
                y:top_25Dept.map(row => row.properties.mag),
                type: 'scatter',
                mode:'markers'
            };

            var bubble_data = [bubble_trace];

            var bubble_layout = {
                title: "Magnitude Vs Depth",
                xaxis: {title: "Depth of Earthquake"},
                yaxis: {title: "Magnitude of Earthquake"},
                height: 500,
                width: 700
                };

        } else if (value == "sig"){
            // Sorted by 25 significant earthquakes
            var sortedSig= data.features.sort((a,b) => {
            return b.properties.sig - a.properties.sig;
        });
            
            var top_25Sig = sortedSig.slice(0,25);
    
            // Magnitude Vs Earthquake Significance
            var bubble_trace = {
                x:top_25Sig.map(row => row.properties.mag),
                y:top_25Sig.map(row => row.properties.sig),
                mode: "markers",
                type: 'scatter'
            };
        
            var bubble_data = [bubble_trace];
        
            var bubble_layout = {
                title: "Magnitude Vs Significance",  
                xaxis: {title: "Significance of Earthquake"},
                yaxis: {title: "Magnitude of Earthquake"},
                height: 500,
                width: 700
                };
            }
    
        Plotly.newPlot("scatter",bubble_data,bubble_layout);

    });
})

