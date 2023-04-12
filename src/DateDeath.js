import React from 'react';
import CanvasJSReact from './canvasjs.react';
import deathDays from './deathDays.json';

export default function DeathDays() {

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const data = deathDays.map((item) => ({ label: item.date, y: item.deaths }))

    const [dropdownRange, setDropdownRange] = React.useState({from:data,to:data});
    const [dropdownData,setDropdownData] = React.useState(data);

    const [rangeValue,setRangeValue] = React.useState({from:data[0].label,to:data[data.length-1].label});


    React.useEffect(()=>{

        let rangeDataFrom = data.findIndex((item)=> item.label === rangeValue.from);
        let rangeDataTo = data.findIndex((item)=> item.label === rangeValue.to);
        setDropdownRange({from:data,to:data.slice(rangeDataFrom,data.length+1)});
        setDropdownData(data.slice(rangeDataFrom,rangeDataTo+1))

    },[rangeValue])

console.log(dropdownRange,'dropdownRangedropdownRange')

    const options = {
        animationEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        axisY: {
            includeZero: true,
            title: "Deaths"
        },
        axisX: {
            title: "Date",
            labelFontSize: 0
        },
        data: [{
            type: "column",
            color: "#8f00ff",
            dataPoints: dropdownData
        }]
    }

    return <div>
        <div className="selectPicker">
            <div>
                <label htmlFor="fromDate">From Date:</label>
                <select name="fromDate" id="fromDate" value={rangeValue.from} onChange={(e)=>setRangeValue((value)=>({...value,from:e.target.value}))}>
                    {dropdownRange.from.map((item, key) => <option key={key} value={item.label}>{item.label}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="fromDate">To Date:</label>
                <select name="toDate" id="toDate" value={rangeValue.to} onChange={(e)=>setRangeValue((value)=>({...value,to:e.target.value}))}>
                    {dropdownRange.to.map((item, key) => <option key={key} value={item.label}>{item.label}</option>)}
                </select>
            </div>
        </div>
        <div className='canvasChart'>
            <CanvasJSChart options={options} />
        </div>

    </div>
}