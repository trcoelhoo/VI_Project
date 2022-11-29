function barchart() {
    var svg = d3.select("svg"),
    margin=50,
    width=svg.attr("width")-margin,
    height  = svg.attr("height")-margin;

    var xScale= d3.scaleBand().range([0,width]).padding(0.4),
    yScale = d3.scaleLinear().range([height,0]);
    var g = svg.append("g").attr("transform","translate("+100+","+100+")");
    d3.csv("../datasets/Municipios/NUTSII_Ecras.csv").then(function(data) {
        xScale.domain(data.map(function(d){return d.Região;}));
        yScale.domain([0,d3.max(data,function(d){return d[2017]})]);
        g.append("g").attr('transform','translate(0,'+height+')').call(d3.axisBottom(yScale))
        g.append('g').call(d3.axisLeft(xScale).tickFormat(function(d){return d;}).ticks(10));
        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class","bar")
            .attr("x",function(d){return d[2017];})
            .attr("y",function(d){return d.Região;})
            .attr("width",xScale.bandwidth())
            .attr("height",function(d){return height-yScale(d.Região);});
    });
}