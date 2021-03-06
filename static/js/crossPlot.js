// Bubble chart to show Top 25 Highest Magnitudes vs location
// Top 25 earthquakes with largest Depth of earthquake vs magnitude
// Signicance (Value is determing by a number of factors eg mag, max MMI, reports and estimated impact) vs mag



// Fetching the data for the scatterplot
d3.json("API/earthquakes").then(data => {
    console.log(data)

    // Initial scatter plot: Magnitude Vs Location
    var sortedMag= data.sort((a,b) => {
        return b.Magnitude - a.Magnitude;
    });
    
    var top_25Mag = sortedMag.slice(0,25);
    console.log(top_25Mag)

    // Location Vs Magnitude ScatterPlot
    function getRadius(magnitude) {
        if (magnitude === 0) {
          return 1;
        }
        return magnitude * 6;
      }
    
    var bubble_trace = {
        x:top_25Mag.map(row => row.Longitude),
        y:top_25Mag.map(row => row.Latitude),
        mode: "markers",
        marker: {
            size: top_25Mag.map(row => getRadius(row.Magnitude))
        }
    };

    var bubble_data = [bubble_trace];

    var bubble_layout = {
        title: "Magnitude Vs Location",
        xaxis: {title: "Longitude"},
        yaxis: {title: "Latitude"},
        height: 500,
        width: 1000
        };

        Plotly.newPlot("scatter",bubble_data,bubble_layout);


     // Event Listener on dropdown 
     d3.select("#selectOption").on("change", () =>{
        var element = d3.select("#selectOption");
        var value = d3.select("#selectOption").property("value");
    
        if (value == 'location'){
            // Sorted by top 25 Magitudes
            var sortedMag= data.sort((a,b) => {
            return b.Magnitude  - a.Magnitude ;
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
                x:top_25Mag.map(row => row.Longitude),
                y:top_25Mag.map(row => row.Latitude),
                mode: "markers",
                marker: {
                    size: top_25Mag.map(row => getRadius(row.Magnitude))     
                }
            };

            var bubble_data = [bubble_trace];

            var bubble_layout = {
                title: "Magnitude Vs Location",
                xaxis: {title: "Longitude"},
                yaxis: {title: "Latitude"},
                height: 500,
                width: 1000
                };
        
        } else if (value == "depth"){
            // Sorted by top 25 Depth
            var sortedDept= data.features.sort((a,b) => {
            return b.Depth - a.Depth;
        });
        
            var top_25Dept = sortedDept.slice(0,25);

            // Bubble chart for Magnitude Vs Depth
            var bubble_trace = {
                x:top_25Dept.map(row => row.Depth),
                y:top_25Dept.map(row => row.Magnitude),
                type: 'scatter',
                mode:'markers'
            };

            var bubble_data = [bubble_trace];

            var bubble_layout = {
                title: "Magnitude Vs Depth",
                xaxis: {title: "Depth of Earthquake"},
                yaxis: {title: "Magnitude of Earthquake"},
                height: 500,
                width: 1000
                };
            } 
        
    
        Plotly.newPlot("scatter",bubble_data,bubble_layout);

    });
})



  // } else if (value == "sig"){
        //     // Sorted by 25 significant earthquakes
        //     var sortedSig= data.features.sort((a,b) => {
        //     return b.properties.sig - a.properties.sig;
        // });
            
        //     var top_25Sig = sortedSig.slice(0,25);
    
        //     // Magnitude Vs Earthquake Significance
        //     var bubble_trace = {
        //         x:top_25Sig.map(row => row.properties.mag),
        //         y:top_25Sig.map(row => row.properties.sig),
        //         mode: "markers",
        //         type: 'scatter'
        //     };
        
        //     var bubble_data = [bubble_trace];
        
        //     var bubble_layout = {
        //         title: "Magnitude Vs Significance",  
        //         xaxis: {title: "Significance of Earthquake"},
        //         yaxis: {title: "Magnitude of Earthquake"},
        //         height: 500,
        //         width: 1000
        //         };