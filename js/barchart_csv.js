function barchart() {
    var svg = d3.select("svg"),
    margin={top:20,right:20,bottom:20,left:20},
    width=svg.attr("width"),
    height  = svg.attr("height"),
    innerWidth=width-margin.left -margin.right,
    innerHeight  = height-margin.top -margin.bottom;

    var xScale= d3.scaleBand().range([0,innerWidth]).padding(0.1),
    yScale = d3.scaleLinear().range([0,innerHeight]);
    var xValue=d=>d.Região;
    var yValue=d=>d[2017];
    var g = svg.append("g").attr('transform','translate(${margin.left},${margin.top})');
    d3.csv("../datasets/Municipios/NUTSII_Ecras.csv").then(function(data) {
        xScale.domain([data.map(data,xValue)]);
        yScale.domain(data.map(yValue));
        g.append("g").call(d3.axisLeft(xScale)).attr('transform','translate(0,'+innerHeight+')');
        g.append('g').call(d3.axisBottom(yScale));
        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class","bar")
            .attr('y',d=>yScale(yValue(d)))
            .attr('width',d=>xScale(xValue(d)))
            .attr('height',d=>yScale.bandwidth());
    });
}


// import{select,csv,scaleLinear,max,scaleBand,axisBottom,axisLeft} from d3;


// const svg = d3.select("svg");
// const margin={top:20,right:20,bottom:20,left:20};
// const width=svg.attr("width");
// const height  = svg.attr("height");
// const innerWidth=width-margin.left -margin.right;
// const innerHeight  = height-margin.top -margin.bottom;

// const render = data => {
//     const yValue = d=>d.Região;
//     const xValue = d=>d[2017];
//     const xScale = scaleLinear()
//         .domain([0,max(data,xValue)])
//         .range([0,innerWidth]);
//     const yScale = scaleBand()
//         .domain(data.map(yValue))
//         .range([0,innerHeight])
//         .padding(0.1);

//     const g = svg.append('g')
//         .attr('transform','translate(${margin.left},${margin.top})');
//     g.append('g').call(axisBottom(xScale));
//     g.append('g').call(axisLeft(yScale))
//         .attr('transform','translate(0,${innerHeight})');

//     g.selectAll('rect').data(data)
//         .enter().append('rect')
//             .attr('y',d=>yScale(yValue(d)))
//             .attr('width',d=>xScale(xValue(d)))
//             .attr('height',d=>yScale.bandwidth());
// };

// csv('../datasets/Municipios/NUTSII_Ecras.csv').then(data=>{
//     console.log(data);
// });