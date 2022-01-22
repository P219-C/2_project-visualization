// Scatterplot/Bubble chart to show location(close to equator) Vs...
    // Top 25 Highest Magnitudes
    // Top 25 earthquakes with largest Depth of earthquake
    // Signicance: Value is determing by a number of factors eg mag, max MMI, reports and estimated impact


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Fetching the data for the scatterplot
d3.json(url).then(data => {
    console.log(data)

    // Initial scatter plot
    // Sorted by top 25 Magitudes
    var sortedMag= data.features.sort((a,b) => {
        return b.properties.mag - a.properties.mag;
    });
    
    var top_25Mag = sortedMag.slice(0,25);

    // Location Vs Magnitude ScatterPlot
    var bubble_trace = {
        x:top_25Mag.map(row => row.geometry.coordinates[1]),
        y:top_25Mag.map(row => row.geometry.coordinates[0]),
        mode: "markers",
        marker: {
            size: top_25Mag.map(row => row.properties.mag),
            colorscale: 'YlGnBu'
        }
    };

    var bubble_data = [bubble_trace];

    var bubble_layout = {
        title: "Location Vs Magnitude",
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
    
        if (value == 'mag'){
            // Sorted by top 25 Magitudes
            var sortedMag= data.features.sort((a,b) => {
            return b.properties.mag - a.properties.mag;
        });
        
            var top_25Mag = sortedMag.slice(0,25);

            // Location Vs Magnitude ScatterPlot
            var bubble_trace = {
                x:top_25Mag.map(row => row.geometry.coordinates[1]),
                y:top_25Mag.map(row => row.geometry.coordinates[0]),
                mode: "markers",
                marker: {
                    size: top_25Mag.map(row => row.properties.mag),
                    colorscale: 'YlGnBu'
                }
            };

            var bubble_data = [bubble_trace];

            var bubble_layout = {
                title: "Location Vs Magnitude",
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

            // Location Vs Earthquake Depth
            var bubble_trace = {
                x:top_25Dept.map(row => row.geometry.coordinates[1]),
                y:top_25Dept.map(row => row.geometry.coordinates[0]),
                mode: "markers",
                marker: {
                    size: top_25Dept.map(row => row.geometry.coordinates[2]),
                    colorscale: 'YlGnBu'
                }
            };

            var bubble_data = [bubble_trace];

            var bubble_layout = {
                title: "Location Vs Depth",
                yaxis: {title: "Longitude"},
                xaxis: {title: "Latitude"},
                height: 500,
                width: 700
                };

        } else if (value == "sig"){
            // Sorted by 25 significant earthquakes
            var sortedSig= data.features.sort((a,b) => {
            return b.properties.sig - a.properties.sig;
        });
            
            var top_25Sig = sortedSig.slice(0,25);
    
            // Location Vs Earthquake Significance
            var bubble_trace = {
                x:top_25Sig.map(row => row.geometry.coordinates[1]),
                y:top_25Sig.map(row => row.geometry.coordinates[0]),
                mode: "markers",
                marker: {
                    size: top_25Sig.map(row => row.properties.sig),
                    colorscale: 'YlGnBu'
                }
            };
        
            var bubble_data = [bubble_trace];
        
            var bubble_layout = {
                title: "Location Vs Significance",  
                yaxis: {title: "Longitude"},
                xaxis: {title: "Latitude"},
                height: 500,
                width: 700
                };
            }
    
        Plotly.newPlot("scatter",bubble_data,bubble_layout);

    });
})

