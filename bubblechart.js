var globalData;
function init(data) {
  d3.csv("data/complete2.csv").then(data => {
    console.log("data:", data[0]);
    globalData = data;
    var name = [];
    var value = [];
    var year = [];
    var population = [];
    // var kBtuSqft = [];
    var yearTypes = [];
    // var zipCodes = [];
    for (var i = 0; i < data.length; i++) {
      // if (data[i].data_year >= 2000 ) {
        // && Number(data[i].site_eui_kbtu_sq_ft)<=500
        var dataItem = data[i];
        var cases = Number(dataItem.value)/100000;

          name.push(dataItem.name);
          value.push(cases);
          year.push(parseInt(dataItem.year));  
          population.push(parseInt(dataItem.population));
          if (!yearTypes.includes(data[i].year)) {
            yearTypes.push(data[i].year)
          }           
      // }
    }
   console.log(name.length);
   console.log(value.length);
   console.log(year.length);
    // console.log(zipCodes);
    var dropdown = d3.select("#selDataset");
    
    dropdown.append("option")
      .text("All")
      .property("value", "all");

    yearTypes.forEach(function(type) {
      dropdown.append("option")
      .text(type)
      .property("value", type.replace(/\s/g, ''));     
    })

    var trace1 = {
        x: population/1000000,
        y: value,
        text: name, 
        mode: 'markers',
        marker: {
        size: population/1000000,
        color: value, 
        colorscale:"Earth"
        }
    };
    console.log(year);
    console.log(value);
    var data = [trace1];
    var layout = {
        title: 'Malaria Cases per Year',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title:"2000 - 2014"},
        margin: {t:30}
    };
    Plotly.newPlot('bubble', data, layout); 
  });
}

function buildChart(yearType) {
  console.log("buildChart")
  if (yearType == "all") {
    data = globalData;
  } else {
    data = globalData.filter(x => x.year.replace(/\s/g, '') == yearType)
  }
  console.log(data);

  var name = [];
  var value = [];
  var year = [];
  var population = [];
  var yearTypes = [];

  for (var i = 0; i < data.length; i++) {
    // if (data[i].data_year >= 2000) {
      // && Number(data[i].site_eui_kbtu_sq_ft)<=500
      var dataItem = data[i];
      var cases = Number(dataItem.value)/100000;
      // var feet = 100;
      // if (cases < 5) {
      //   cases = 10;
      // }
      name.push(dataItem.name);
      value.push(cases);
      year.push(parseInt(dataItem.year));
      population.push(parseInt(dataItem.population));
      // kBtuSqft.push(Number(dataItem.site_eui_kbtu_sq_ft));
      if (!yearTypes.includes(data[i].year)) {
        yearTypes.push(data[i].year)
      }   
    // }
  }   
  // console.log(sqFt);

  var trace1 = {
    x: population/1000000,
    y: value,
    text: name, 
    mode: 'markers',
    marker: {
    size: population/1000000,
    color: value, 
    colorscale:"Earth"
    }
};
var data = [trace1];
var layout = {
    title: 'Malaria Cases per Year',
    showlegend: false,
    hovermode: 'closest',
    xaxis: {title:"2000 - 2014"},
    margin: {t:30}
};
  
  console.log("year: ", year);
  console.log("value:", value);
  Plotly.restyle('bubble', {x:[population/1000000], y:[value], text:[name, year], marker:{size: population/1000000, color: value}});
  
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildChart(newSample);
}
// Initialize the dashboard
init();
