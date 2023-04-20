import React from 'react';
import * as d3 from 'd3';

const ageGroup = {
    0: '0-10',
    1: '11-20',
    2: '21-40',
    3: '41-60',
    4: '61-80',
    5: '>80'
};

const groupData = [
    {
        ageGroup: '0-10',
        male: 0,
        female: 0
    },
    {
        ageGroup: '11-20',
        male: 0,
        female: 0
    },
    {
        ageGroup: '21-40',
        male: 0,
        female: 0
    },
    {
        ageGroup: '41-60',
        male: 0,
        female: 0
    },
    {
        ageGroup: '61-80',
        male: 0,
        female: 0
    },
    {
        ageGroup: '>80',
        male: 0,
        female: 0
    }
]

const construct = (data) => {

    return data.reduce((acc, init) => {
        let idx = acc.findIndex((item) => item.ageGroup === ageGroup[init.age]);
        if (init.gender) acc[idx] = { ...acc[idx], female: acc[idx].female + 1 }
        else acc[idx] = { ...acc[idx], male: acc[idx].male + 1 }

        return acc;

    }, [...groupData])
}

export default function DeathAgeChart({ data }) {


    const container = React.useRef(null);

    const chartConfig = React.useRef(null);

    const [loading, setLoading] = React.useState(true);

    const margin = { top: 10, right: 30, bottom: 20, left: 50 },
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        barPadding = 0.2;

    React.useEffect(() => {

        if (container.current) {

            const map = d3.select(container.current);

            const xScale0 = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).paddingInner(barPadding)
            const xScale1 = d3.scaleBand()
            const yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

            const xAxis = d3.axisBottom(xScale0).tickSizeOuter(0);
            const yAxis = d3.axisLeft(yScale).ticks(6).tickSizeOuter(0);

            chartConfig.current = { map, xScale0, xScale1, yScale, xAxis, yAxis }
        }

    }, [])



    React.useEffect(() => {

        if (chartConfig.current) {

            const graphData = construct([...data])


            const { map, xScale0, xScale1, yScale, xAxis, yAxis } = chartConfig.current


            xScale0.domain(graphData.map(d => d.ageGroup))
            xScale1.domain(['male', 'female']).range([0, xScale0.bandwidth()])
            yScale.domain([0, d3.max(graphData, d => d.male > d.female ? d.male : d.female)])


            const ageGroup = map.selectAll(".age_group")
                .data(graphData)
                .join("g")
                .attr("class", "age_group")
                .attr("transform", d => `translate(${xScale0(d.ageGroup)},0)`);

            /* Add field1 bars */
            ageGroup.selectAll(".bar.male")
                .data(d => [d])
                .join("rect")
                .attr("class", "bar male")
                .style("fill", "blue")
                .attr("x", d => xScale1('male'))
                .attr("y", d => yScale(d.male))
                .attr("width", xScale1.bandwidth())
                .attr("height", d => {
                    return height - margin.top - margin.bottom - yScale(d.male)
                });

            /* Add field2 bars */
            ageGroup.selectAll(".bar.female")
                .data(d => [d])
                .join("rect")
                .attr("class", "bar female")
                .style("fill", "red")
                .attr("x", d => xScale1('female'))
                .attr("y", d => yScale(d.female))
                .attr("width", xScale1.bandwidth())
                .attr("height", d => {
                    return height - margin.top - margin.bottom - yScale(d.female)
                });

                map.exit().join()

            map.select('.x-axis')
                .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
                .call(xAxis);// Add the Y Axis
            map.select('.y-axis')
                .call(yAxis);



        }
        return () => {

        }



    }, [data])


    return <div>

        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>

            <g
                ref={container}
                transform={"translate(" + margin.left + "," + margin.top + ")"}
            >
                    <g className="x-axis" />
                    <g className="y-axis" />
            </g>

        </svg>

    </div>
}