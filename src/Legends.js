import React from 'react';
import * as d3 from "d3";


export default function Legends(){

    const chartData = [
        {name: "Death", color: "#fff",stroke:'#000'},
        {name: "Pump", color: "#000",stroke:'#000'},
        {name: "Brewery", color: "yellow",stroke:'yellow'},
        {name: "WorkHouse", color: "grey",stroke:'blue'},
    ];

    const legendContainer = React.useRef(null);


    React.useEffect(()=>{
        if(legendContainer.current){

            const legendItemSize = 12;
            const legendSpacing = 4;
            const xOffset = 150;
            const yOffset = 100;
            const legend = d3
                .select(legendContainer.current)
                .append('svg')
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
                .style('stroke', d => d.stroke)
                .attr('transform',
                    (d, i) => {
                        const x = xOffset;
                        const y = yOffset + (legendItemSize + legendSpacing) * i;
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
        return ()=>{
            legendContainer.current = null;
        }
    },[])




    return(<div className='symbols' ref={legendContainer}/>)

}