var data = [
    {
      language: 'bruh',
      value: 78.9,
    },
    {
      language: 'what',
      value: 75.1,
    },
    {
      language: 'why',
      value: 68.0,
    },
    {
      language: 'stahp',
      value: 67.0,
    },
    {
      language: 'no',
      value: 65.6,
    },
    {
      language: 'halp',
      value: 65.1,
    },
    {
      language: 'do',
      value: 61.9,
    },
    {
      language: 're',
      value: 60.4,
    },
    {
      language: 'mi',
      value: 59.6,
    },
    {
      language: 'fa',
      value: 50000,
    }
  ];

  var margin = {top: 20, right: 30, bottom: 40, left: 90},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleLinear()
    .domain([0, 13000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");


      var y = d3.scaleBand()
      .range([ 30, height ])
      .domain(data.map(function(d) { return d.language; }))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(y))


      svg.selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0) )
      .attr("y", function(d) { return y(d.language); })
      .attr("width", function(d) { return x(d.value); })
      .attr("height", y.bandwidth() )
      .attr("fill", "#69b3a2")
  

  