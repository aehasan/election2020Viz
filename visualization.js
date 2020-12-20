var svg = d3.select("#map")
        .append("svg")
        .attr("height", 500)
        .attr("width", 1000)

var promises = [];
var projection = d3.geoAlbersUsa();

var path = d3.geoPath().projection(projection);
var fipsToVotes = {};
var tempContainer = svg.append("g")

var mouseOverContainer = svg.append("g")




var demColor = d3.scaleThreshold().domain([1,1.3,1.5,1.7,2]).range(["#ccccff", "#8080ff", "#3333ff", "#0000e6", "#000033" ]);
var repColor = d3.scaleThreshold().domain([1,1.3,1.5,1.7,2]).range(["#ffb3b3", "#ff6666", "#ff1a1a", "#cc0000", "#8b0000" ]);


async function test() {
    
    j =   await d3.csv("https://raw.githubusercontent.com/MEDSL/2018-elections-unoffical/master/election-context-2018.csv").then(
    function(data) {
 
         
        data.forEach(function(d) {
            //console.log(d.clinton16)
             if(d.fips == 46113) {
                fipsToVotes[46102] = [d.clinton16, d.trump16];
            
            } 
            else if (d.fips.length > 4) {
            fipsToVotes[d.fips] = [d.clinton16, d.trump16];
            } else {
                fipsToVotes["0" + d.fips] = [d.clinton16, d.trump16];

            }

        })


    });

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json").then(
    function(data) {
        //console.log(data.objects.counties.geometries[0].properties.name)

        var states = topojson.feature(data, data.objects.counties).features

        //console.log(states)
        tempContainer.selectAll(".states")
            .data(states)
            .enter()
            .append("path")
            //.datum(groupData)
            .attr("class" , "states")
            .attr("d", path)
            .attr("fill", function(data) {
                var temp = fipsToVotes[data.id]
            if (temp != undefined) {
                var groupData = data.id
                d3.select(this).datum(groupData)
                //console.log(temp[0])
                if (data.id == 17031) {
                    console.log(fipsToVotes[data.id])
                    console.log(data)

                }
                var tempa = fipsToVotes[data.id][0]
                var tempb = fipsToVotes[data.id][1]
                if (Number(tempa) >= Number(tempb)) {

                    var first = Number(tempa) / Number(tempb)


                    return demColor(first)

                } else if (Number(fipsToVotes[data.id][0]) < Number(fipsToVotes[data.id][1])) {
                    var tempa1 = fipsToVotes[data.id][0]
                    var tempb2 = fipsToVotes[data.id][1]
                    var first = Number(tempb2) / Number(tempa1)

                    return repColor(first)
  
                } 
            }
                console.log(fipsToVotes[data.id])

                return "#f2f0f7"
            }).attr("opacity", .85)
            .on("mouseover", function(data, index) {
                //console.log(data)
                console.log(index)
                console.log(d3.select(this).data())
                //console.log(d3.select(this).datum())

                var xVar = event.clientX
                var yVar = event.clientY
                
                mouseOverContainer.append("rect")
                    .attr("class", "dataBoxes")
                    .attr("x", xVar + 10)
                    .attr("y", yVar - 40)
                    .attr("width", 160)
                    .attr("height", 50)
                    .attr("opacity", .8)

                    mouseOverContainer.append("text").attr("class" , "val")
                    .attr("x", function() { return xVar + 10 })
                    .attr("y", function() { return yVar  - 25})
                    .text(function() {
            
                        console.log(fipsToVotes[index])
                        return fipsToVotes[index][0]
                
                
                    }).attr("fill", "#3333ff" )
                    .attr("opacity", 1)
                    mouseOverContainer.append("text").attr("class" , "val")
                    .attr("x", function() { return xVar + 10 })
                    .attr("y", function() { return yVar  - 5})
                    .text(function() {
            
                        console.log(fipsToVotes[index])
                        return fipsToVotes[index][1]
                
                
                    }).attr("fill","#ffb3b3" )
                    .attr("opacity", 1)
                
            }).on("mouseout", function(d) {
  
                mouseOverContainer.selectAll("rect").remove()
                mouseOverContainer.selectAll("text").remove()

            })
        }
    );
}


test();


