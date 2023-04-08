import React from 'react';
import CanvasJSReact from './canvasjs.react';

export default function DeathAgeChart({data}) {

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const [graphData,setData] = React.useState(data);


    React.useEffect(()=>{
        setData(data)
    },[data])

    const ageGroup = {
        0:'0-10',
        1:'11-20',
        2:'21-40',
        3:'41-60',
        4:'61-80',
        5:'>80'
    };
    const options = {
        animationEnabled: true,
        axisY: {
            title: "Deaths",
            includeZero: true
        },
        axisX: {
            title: "Age Groups",
        },
        legend: {
            cursor:"pointer",
        },
        toolTip: {
            shared: true,
        },
        data: [{
            type: "column",
            showInLegend: true,
            name: "Death",
            color: "gold",
            dataPoints:data.sort((first,second)=> {
                if(first.age>second.age)return 1;
                else return -1;
            }).map((item)=>{
                return {y:item.value,label:ageGroup[item.age]}
            })
        }]
    }

    return <CanvasJSChart options = {options} />
}