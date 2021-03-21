function linearChart() {



    // set the dimensions and margins of the graph
    var margin = {
            top: 10,
            right: 30,
            bottom: 40,
            left: 100
        },
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const chrtDiv = document.getElementById("chart");
    console.log(chrtDiv)
    chrtDiv.remove();
    const newDiv = document.createElement("div");
    newDiv.id = 'chart';
    document.getElementById("my_dataviz").appendChild(newDiv);





    // append the svg object to the body of the page
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
   // C:\xampp\htdocs\d3-course-code\Final\filenew.csv

  
   d3.csv("http://localhost/Final_Code/d3-Charts/lollipopChart/data.csv").then(function (data) {


        // sort data
        data.sort(function (b, a) {
            return a.value - b.value;
        });

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, d3.max(data.map(function (d) {
                return parseInt(d.value) + 10;
            }))])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-35)")
            .style("text-anchor", "end");

        // Y axis as I want to show characters so I am using scaleBand for this
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) {
                return d.country;
            }))
            .padding(1);
        svg.append("g")
            .call(d3.axisLeft(y))

        // Lines
        // var myline = d3.line();
        svg.selectAll("alllines")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return x(d.value);
            })
            .attr("x2", x(0))
            .attr("y1", function (d) {
                return y(d.country);
                //console.log(d.country);
            })
            .attr("y2", function (d) {
                return y(d.country);
            })
            .attr("stroke", "grey")

        // Circles
        svg.selectAll("mycircle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return x(parseInt(d.value));
            })
            .attr("cy", function (d) {
                console.log(d.country);
                return y(d.country);
            })
            .attr("r", "7")
            .style("fill", "#69b3a2")
            .attr("stroke", "black")
    })
}

