/**
   Anish Shenoy & Kely Wang
   Softdev2 pd7
   K #14: You Are Smarter Than the President*
   2018-03-26
**/

var overviewData = {"1948": {"revenue": 312, "spending": 224, "total": 88.6, "total%": 4.5, "GDP": 1.97},
		    "1942": {"revenue": 160, "spending": 390, "total": -227, "total%": -29.6, "GDP": 1.92}};

var createYear = function(year){
    var svg = document.getElementById("svg");

    //CLEAR SVG
    var firstChild = svg.firstChild;
    while(firstChild){
      console.log("Clearing: ");
      console.log(firstChild);
      svg.removeChild(firstChild);
      firstChild = svg.firstChild;
    }

    var yearHeader = document.getElementById("year");
    yearHeader.innerHTML = "United States Federal Budget for " + year;
    generateCircles(year);
}

var generateCircles = function(year){
    //var lastCircleFinalX = 0;
    var yearData = overviewData[year];
    var sizes = [yearData["revenue"]/3, yearData["spending"]/3]
    console.log(sizes);
    var colors = ["Green", "Red"];
    var svg = d3.select("svg");
    svg.selectAll("circle")
	.data(sizes)
	.enter().append("circle")
	.attr("cx",
    function(d, i){
      if(i == 0){
        return 200;
      }
      else{
        return 550;
      }
    })
	.attr("cy", 150)
	.attr("r", 0)
	.transition().duration(function(d,i){ return (i+1) * 2500; }).attr("r", function(d){ return d; })
	.attr("fill", function(d, i){ return colors[i]; });

    svg.selectAll("text")
	.data(sizes)
    	.enter().append("text")
	.attr("x", function(d, i){
    if(i == 0){
      return 120;
    }
    else{
      return 470;
    }
  })
	.attr("y", 300)
	.attr("font-family", "Garamond")
	.attr("font-size", "20px")
	.transition().delay(function(d,i){ return (i+1) * 2500; }).text(function(d){ return d*3 + " Billion Dollars"; });

};


var makeBar = function(){
    var y48 = overviewData["1948"];
    var y42 = overviewData["1942"];
    var totals =[y42["total"],y48["total"]]

    var chart = d3.select(".chart");


    chart.selectAll("div")
	.data(totals)
	.enter().append("div")
	.transition().duration(2500).style("width",function(d){
	    console.log(d);
	    return Math.abs(d) + "px";})

	.style("background-color",function(d,i){
	    if ( d < 0 ) { return "red";}
	    else { return "green"; }} )
	.text(function(d,i) {
	    if ( i == 0 ) {return "1942: " + d + " Billion" ;}
	    else { return "1948: " + d +" Billion" ; }});

};
var yr = true;
var changeYear = function(e){
    if(yr){
      createYear("1942");
      yr = !yr;
    }
    else{
      createYear("1948");
      yr = !yr;
    }
}

var buton = document.getElementById("switch");
buton.addEventListener("click",changeYear);
makeBar();
createYear("1948");
