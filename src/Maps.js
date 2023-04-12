import React from 'react';
import * as d3 from 'd3';
import streets from './streets.json';
import pumps from './pumps.json';
import deathAgeSex from './deathagesex.json'

export default function Maps({data}) {

    const container = React.useRef(null);

    const arrayMap = {
        0:{
            0:'#42b3f5',
            1:'#c96565'
        },
        1:{
            0:'#4296f5',
            1:'#cc5656'
        },
        2:{
            0:'#427ef5',
            1:'#cc4343'
        },
        3:{
            0:'#425df5',
            1:'#cc3333'
        },
        4:{
            0:'#4242f5',
            1:'#cf2727'
        },
        5:{
            0:'#2315bd',
            1:'#d41111'
        }
    }

    const width = 700;
    const height =600;

    React.useEffect(() => {

        if (container.current) {
            const map = d3.select(container.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background-color', 'white')
                .style('border', '1px solid black');

            const line = d3.line().x((d, i)=> d.x *35).y((d, i) =>700 - (d.y *35));

            map.selectAll("line")
            .data(streets)
            .enter()
            .append("path")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "grey")
            .attr("stroke-width", 2);

            pumps.forEach((d)=>{
                d.x = parseFloat(d.x)*35;
                d.y = 700 - (parseFloat(d.y)*35);
            })

            deathAgeSex.forEach((d)=>{
                d.x = parseFloat(d.x) *35;
                d.y = 700 - (parseFloat(d.y)*35);
            })

           map.selectAll("pumps")
            .data(pumps)
            .enter()
            .append("rect")
            .attr("x",(d)=> d.x )
            .attr("y",(d)=> d.y)
            .attr("width", 9)
            .attr("height",9)
            .style('cursor', 'pointer')
            .on("click",(ee) =>{
                console.log(ee.target," dd clicked");
            });

            map.selectAll("deaths")
            .data(deathAgeSex)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)  
            .attr("cy", (d) => d.y)
            .attr("fill", (d)=> arrayMap[d.age][d.gender])
            .attr("stroke", "grey")
            .attr("stroke-width", 2) 
            .attr("r",6)
            .on("click",(ee) =>{
                console.log(ee.target," dd clicked");
            });
        }

        return () => {
            container.current = null
        }
    }, [])


    return <div ref={container} />
}