import React from 'react';
import CanvasJSReact from './canvasjs.react';
import deathDays from './deathDays.json';

export default function DeathDays() {

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const data = deathDays.map((item) => ({ label: item.date, y: item.deaths })) 
    
    const options = {
        animationEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        axisY: {
            includeZero: true,
            title: "Deaths"
        },
        axisX: {
            title: "Date",
            labelFontSize:0
        },
        data: [{
            type: "column",
            color: "#8f00ff",
            dataPoints:data
        }]
    }

    return <CanvasJSChart options = {options} />
}