import React from 'react';
import * as d3 from 'd3';
import streets from './streets.json';
import pumps from './pumps.json';
import deathAgeSex from './deathagesex.json'

export default function Maps({ data }) {

    const [deathData, setData] = React.useState(data);

    const container = React.useRef(null);

    const width = 700;
    const height = 600;

    const createLine = d3.line().x(d => d.x = (parseFloat(d.x) * 32)).y(d => d.y = 700 - (parseFloat(d.y) * 37));

    const arrayMap = {
        0: {
            0: '#42b3f5',
            1: '#c96565'
        },
        1: {
            0: '#4296f5',
            1: '#cc5656'
        },
        2: {
            0: '#427ef5',
            1: '#cc4343'
        },
        3: {
            0: '#425df5',
            1: '#cc3333'
        },
        4: {
            0: '#4242f5',
            1: '#cf2727'
        },
        5: {
            0: '#2315bd',
            1: '#d41111'
        }
    }

    React.useEffect(() => {

        if (container.current) {

            const map = d3.select(container.current);

            for (var i = 0; i < streets.length; i++) {
                map.append("path")
                    .attr("class", "plot")
                    .datum(streets[i])
                    .attr("d", createLine)
                    .attr("fill", "none")
                    .attr("stroke", "grey")
                    .attr("stroke-width", 2);
            }

            for (var i = 0; i < pumps.length; i++) {

                map.append("rect")
                    .datum(pumps[i])
                    .attr("x", (d) => parseFloat(d.x) * 32)
                    .attr("y", (d) =>  700 - (parseFloat(d.y) * 37))
                    .attr("width", 9)
                    .attr("height", 9)
                    .style('cursor', 'pointer')
                    .on("click", (ee) => {
                        console.log(ee.target, " dd clicked");
                    });
            }
        }
    }, [])


    React.useEffect(()=>{

        const myData = d3.selectAll("circle");
        if(myData){

            myData.remove();

        }
        if (container.current) {

            const map = d3.select(container.current);

            for (var i = 0; i < data.length; i++) {
                    
                map.append("circle")
                    .datum(data[i])
                    .attr("cx", (d) => parseFloat(d.x) * 32)
                    .attr("cy", (d) =>  700 - (parseFloat(d.y) * 37))
                    .attr("fill", (d) => arrayMap[d.age][d.gender])
                    .attr("stroke", "grey")
                    .attr("stroke-width", 2)
                    .attr("r", 6)
                    .on("click", (ee) => {
                        console.log(ee.target, " dd clicked");
                    });
            }


        }
    },[data])


    return <div style={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
        <svg width={width} height={height} ref={container} style={{ border: '1px solid black', backgroundClor: '#fff' }} >

        </svg>
    </div>
}