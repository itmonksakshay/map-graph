import React from 'react';
import * as d3 from 'd3';

export default function PieChart({ pieData }) {

    const container = React.useRef(null);
    const legendContainder = React.useRef(null);

    const colors = d3.scaleOrdinal(['#4daf4a', '#377eb8']);

    const width = 500;
    const height = 300;
    const margin = 10;

    const radius = Math.min(width, height) / 2 - margin

    const createPie = d3.pie();

    // Generate the arcs
    const createArc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);



    React.useEffect(() => {

        if (container.current) {

            const data = createPie([pieData.male, pieData.female]);
            const group = d3.select(container.current);
            const groupWithData = group.selectAll("g.arc").data(data);


            groupWithData.exit().remove();

            const groupWithUpdate = groupWithData
                .enter()
                .append("g")
                .attr("class", "arc");

            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));

            path
                .attr("class", "arc")
                .attr("d", createArc)
                .attr("fill", (d, i) => colors(i));

            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text"));
        
            text
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("transform", d => `translate(${createArc.centroid(d)})`)
                .style("fill", "black")
                .style("font-size", 20)
                .text(d => d.value);

        }

        if (legendContainder.current) {

            const legendItemSize = 20;
            const legendSpacing = 5;
            const chartData = [{ name: 'male', color: '#4daf4a' }, { name: 'female', color: '#377eb8' }]

            var xOffset = 50;
            var yOffset = 10;
            var legend = d3
                .select(legendContainder.current)
                .append('svg')
                .attr('width', 400)
                .attr('height', 60)
                .selectAll('.legendItem')
                .data(chartData);


            //Create legend items
            legend
                .enter()
                .append('rect')
                .attr('class', 'legendItem')
                .attr('width', legendItemSize)
                .attr('height', legendItemSize)
                .style('fill', d => d.color)
                .attr('transform',
                    (d, i) => {
                        var x = xOffset;
                        var y = yOffset + (legendItemSize + legendSpacing) * i;
                        return `translate(${x}, ${y})`;
                    });

            //Create legend labels
            legend
                .enter()
                .append('text')
                .attr('x', xOffset + legendItemSize + 5)
                .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
                .text(d => d.name);

        }

        return () =>{
            legendContainder.current = null;
        }
        

    }, [pieData])


    return <div>
        <div ref={legendContainder} style={{ display: 'inline-block', width: '100%' }} />
        <svg width={width} height={height}>
            <g
                ref={container}
                transform={"translate(" + width / 2 + "," + height / 2 + ")"}
            />
        </svg>
    </div>
}