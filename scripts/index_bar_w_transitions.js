//Width and height
var w = 600;
var h = 250;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
        11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, w], 0.05);
var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

//Create SVG element
var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
//Create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return xScale(i);
   })
   .attr("y", function(d) {
      return h - yScale(d);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
      return yScale(d);
   })
   .attr("fill", function(d) {
    return "rgb(0, 0, " + (d * 10) + ")";
   });
//Create labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
      return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
      return h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");

//On click, update with new data
d3.select("p")
  .on("click", function() {
    //New values for dataset
    var maxValue = 100;
    var numValues = dataset.length; //Count original length of dataset
    dataset = []; //Initialize empty array
    for (var i = 0; i < numValues; i++) { //Loop numValues times
      var newNumber = Math.floor(Math.random() * maxValue); //New random integer (0-24)
      dataset.push(newNumber); //Add new number to array
    }
    //Update scale domain
    //Recalibrate the scale domain, given the new max value in dataset
    yScale.domain([0, d3.max(dataset)]);

    //Update rects
    svg.selectAll("rect")
    .data(dataset)
    .transition()
    .delay(function(d, i) {
      // Delay of each element in dataset is an equal fraction of total value
      // (1000 ms in this case) - time will be same regardless of size of datatset
      return i / dataset.length * 1000;
    })
    .duration(500) // total transition time will be 1500ms (delay + duration)
    .ease("cubic")
    .attr("y", function(d) {
      return h - yScale(d);
    })
    .attr("height", function(d) {
      return yScale(d);
    })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + (d * 10) + ")";
    });
    // update labels
    svg.selectAll("text")
    .data(dataset)
    .transition()
    .duration(1000)
    .text(function(d) {
      return d;
    })
    .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function(d) {
      return h - yScale(d) + 14;
    });
  });


