/**
   D3 demo: transition basics

   Clyde "Thluffy" Sinclair
   SoftDev2 pd0
   2099-12-31


//build horiz bar chart...
var data = [4, 8, 15, 16, 23, 42];
var chart = d3.select(".chart");
var bar = chart.selectAll("div");
var barUpdate = bar.data(data);
var barEnter = barUpdate.enter().append("div");



   USAGE: reload index.html before executing each from the console...

//instant transition:
barEnter.style("width", function(d) {
  return d * 10 + "px"; });

//5s transition:
barEnter.transition().duration(5000).style("width", function(d) {
  return d * 10 + "px"; });

//trans time prop to bar width
barEnter.transition().duration( function(d){ return d*1000; } )
  .style("width", function(d) {
    return d * 10 + "px"; });


barEnter.text(function(d) { return d; });
**/

var overviewData = {"1948": {"revenue": 312, "spending": 224, "total": 88.6, "total%": 4.5, "GDP": 1.97},
            "1942": {"revenue": 250, "spending": 817, "total": -568, "total%": -29.6, "GDP": 1.92}};

var createYear = function(year){
  var yearHeader = document.getElementById("year");
  yearHeader.innerHTML += year;
  generateCircles(year);
}

var generateCircles = function(year){
  var yearData = overviewData[year];
  var sizes = [yearData["revenue"]/3, yearData["spending"]/3]
  var colors = ["Green", "Red"];

  var svg = d3.select("svg");

  svg.selectAll("circle")
      .data(sizes)
    .enter().append("circle")
      .attr("cx", function(d, i){ return 50 + (d) + (3* d * i) })
      .attr("cy", 150)
      .attr("r", 0)
      .transition().duration(function(d,i){ return (i+1) * 2500; }).attr("r", function(d){ return d; })
      .attr("fill", function(d, i){ return colors[i]; });

  svg.selectAll("text")
      .data(sizes)
    .enter().append("text")
      .attr("x", function(d, i){ return (d - 20) + (3 * d * i) })
      .attr("y", 300)
      .attr("font-family", "Garamond")
      .attr("font-size", "20px")
      .transition().delay(function(d,i){ return (i+1) * 2500; }).text(function(d){ return d*3 + " Billion Dollars"; });

};

createYear("1948");
