import React from 'react';
import CanvasJSReact from './canvasjs.react';

export default function PieChart({data}) {

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const [datasheet,setData] = React.useState(data);

    React.useEffect(()=>{

        setData(data);
    },[data])
    
    const options = {
        animationEnabled: true,
        legend:{
            cursor: "pointer"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            dataPoints:datasheet
        }]
    }

    return <CanvasJSChart options = {options} />
}