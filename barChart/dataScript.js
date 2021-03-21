var $ = function (id) {
    return document.getElementById(id);
}
// Get a CSV file for manipulation
//==========================================================================================================

d3.csv("http://localhost/Final_Code/d3-Charts/barChart/dailyrecord1.csv").then(function (data) {

    rows = data;

    initialise()
})


//==========================================================================================================
var initialise = function () {

    const uniqueData = {};
    rows.map(function (d) {

        if (!uniqueData[d.countriesAndTerritories]) {
            uniqueData[d.countriesAndTerritories] = [];
        }

        uniqueData[d.countriesAndTerritories].push({
            x: parseInt(d.day),
            y: parseInt(d.cases)
        });

    });

    console.log(uniqueData)
    const chartData = [];
    const countriesList = Object.keys(uniqueData);
    console.log(countriesList)
    for (let i = 0; i < countriesList.length; i += 1) {
        chartData.push({
            key: countriesList[i],
            values: uniqueData[countriesList[i]]
        })
    }
    console.log(chartData)

    //Make an array of the country list
    var conuntriesList = rows.map(function (row) {

        return row.countriesAndTerritories;
    });

    // This function is used to sort the values and display unique countries name
    var uniqueCountries = conuntriesList.filter(function (d, i) {
        return conuntriesList.indexOf(d) == i;
    });

    //==========================================================================================================
    //populate the select list with the countries names on the provided dropdown
    uniqueCountries.forEach(function (uniqueCountries) {

        var select = $("select");
        var option = document.createElement("option");
        option.setAttribute("value", uniqueCountries);
        var optionText = document.createTextNode(uniqueCountries);
        option.appendChild(optionText);
        select.appendChild(option);

    });
    //==========================================================================================================
    // Due to this function it retrun the index and based on match we are getting values
    //function to return the index (rows) of the desired country
    var findIndex = function (name) {

        var index = rows.findIndex(function (row) {
            return row.countriesAndTerritories == name;
        });

        return index;
    };

    // ==========================================================================================================
    //method iterate all data and based on the selected value you will fetch cases
    let countryName;
    //===========================================================================================================
    // function to update the dropdown value 


    function updatevalue() {
        countryName = $("select").value;


        let xValue = uniqueData[countryName].map(function (d) {
            return d.x;
        })


        let yValue = uniqueData[countryName].map(function (d) {
            return d.y;
        })
        // const lenVar = yValue.length;

        console.log("y value" + yValue)
        console.log("x value" + xValue)
        const xmin = d3.min(uniqueData[countryName].map(function (d) {
            return d.x;
        }));

        //console.log()

        const min = d3.min(uniqueData[countryName], function (d) {
            return d.x;
        })

        const xmax = d3.max(uniqueData[countryName].map(function (d) {
            return d.x;
        }));

        const ymin = d3.min(uniqueData[countryName].map(function (d) {
            return d.y;
        }));
        const ymax = d3.max(uniqueData[countryName].map(function (d) {
            return d.y;
        }));

// destroy the div and regenerate it on click =======================================================
        const chrtDiv = document.getElementById("chart-display");
        console.log(chrtDiv)
        chrtDiv.remove();
        const newDiv = document.createElement("div");
        newDiv.id = 'chart-display';
        document.getElementById("mainchart").appendChild(newDiv);
//====================================================================================================
        var data = uniqueData[countryName];
        var spacing = 120,
            width = 600,
            height = 500;

        var svg = d3.select("#chart-display").append("svg")
            .attr("width", width).attr("height", height)
            .style("background", "smokewhite")
            .append("g")
            .attr("transform", "translate(" + spacing / 2 + "," + spacing / 2 + ")");

        var xScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) {
                return d.x;
            }), d3.max(data, function (d) {
                return d.x;
            })])
            .range([0, width - spacing]);

        var yScale = d3.scaleLog().base(20)
            .domain([20, d3.max(data, function (d) {
                return d.y;
            })])
            .range([height - spacing, 0]);

        var xAxis = d3.axisBottom(xScale)
            .ticks(10).tickFormat(function (d) {
                return d;
            });
        var yAxis = d3.axisLeft(yScale)
            .ticks(10)
       	

        svg.append("g").attr("transform", "translate(30," + (height - spacing) + ")").call(xAxis);
        svg.append("g").call(yAxis);
        d3.select("g path").remove();
        var rect = svg.selectAll("rect").data(data);
        rect.enter().append("rect")
            .attr("width", 30)
            .attr("height", function (d) {
                return (height - spacing) - yScale(d.y);
            })
            .attr("x", function (d) {
                return xScale(d.x) + 15;
            })
            .attr("y", function (d) {
                return yScale(d.y)
            })
            .style("fill", "indigo");


    }


    // function to provided the selected country 
    function selectedCountryValue() {
        var conIndex = findIndex(countryName);
        //change name in heading
        $("location").innerHTML = rows[conIndex].countriesAndTerritories;
    }


    // on change based on country names covid cases should display

    function covidCases() {
        $("cases").innerHTML = getCases(countryName);

    }

    function daysValue() {
        $('days').innerHTML = getdays(countryName);
    }
    //When the select list changes
    $("select").onchange = function () {
        updatevalue();
        selectedCountryValue();
        // covidCases();  // to see the numeric values we can uncomment this code 
        //  daysValue();

        //Use the conIndex to access the required row..
        //console.log(rows[conIndex].countriesAndTerritories);
    }

    // based on matching country fetch the no of covid cases
    function getCases(name) {
        var cases = []
        rows.map(function (row) {
            if (row.countriesAndTerritories === countryName) {
                cases.push(row.cases)
            }

        })

        return (cases.reverse());
    }

    function getdays(day) {
        var days = []
        rows.map(function (row) {
            if (row.countriesAndTerritories === countryName) {
                days.push(row.day)
            }

        })

        return (days.reverse());
    }


}