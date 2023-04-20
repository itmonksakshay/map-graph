import logo from './logo.svg';
import './App.css';
import React, { createRef, useEffect } from 'react';
import DeathDays from './DateDeath';
import deathDays from './deathDays.json';
import PieChart from './PieChart';
import DeathAgeChart from './DeathAgeChart';
import MapLegend from './MapLegend';
import deathAgeSex from './deathagesex.json'
import Maps from './Maps';


const pieData = deathAgeSex.reduce((acc,initialValue)=>{
  if(initialValue.gender){
    acc = {...acc,female:acc.female+1}
    return acc;
  }
  acc = {...acc,male:acc.male+1}
  return acc;
},{male:0,female:0})



function App() {

  const [deathAgeSexValue,setDeathSexAge] = React.useState(deathAgeSex)
  const [pieValue,setPieData] = React.useState(pieData)

  const [selectedRangeValue, setSelectedRangeValue] = React.useState({from:deathDays[0].date,to:deathDays[deathDays.length-1].date})

  React.useEffect(()=>{


    const initialSkipIdx = deathDays.findIndex((item)=>item.date === selectedRangeValue.from);
    const lastSkipIdx = deathDays.findIndex((item)=>item.date === selectedRangeValue.to);

    const deathArrayValue = deathDays.slice(initialSkipIdx,lastSkipIdx+1).reduce((acc,init)=>{
      acc = acc+init.deaths
      return acc;
    },0);

    const initSkipValue = deathDays.slice(0,initialSkipIdx).reduce((acc,init)=>{
      acc = acc+init.deaths
      return acc;
    },0);

    const filteredDeathSexValue = deathAgeSex.slice(initSkipValue,deathArrayValue)
    setDeathSexAge(filteredDeathSexValue)

  },[selectedRangeValue])

React.useEffect(()=>{

  const pieData = deathAgeSexValue.reduce((acc,initialValue)=>{
    if(initialValue.gender){
      acc = {...acc,female:acc.female+1}
      return acc;
    }
    acc = {...acc,male:acc.male+1}
    return acc;
  },{male:0,female:0})

  setPieData(pieData);

},[deathAgeSexValue])




  return (<div className='main-layout'>
    <div className="container-layout">
    <div className='legend-graphs'>
      <div className='map-legend'>
        <div className='map-caption'>
          <h6>Map legend</h6>
        </div>
        <div className='list-table'>
          <div className='symbols'>
            {/* <ul className='symbol-list'>
              <li><i className="fa-solid fa-square"></i> Death</li>
              <li><i className="fa-solid fa-square"></i> Pump</li>
              <li><i className="fa-solid fa-square"></i> Brewery</li>
              <li><i className="fa-solid fa-square"></i>Work House</li>
            </ul> */}
            <MapLegend/>
          </div>
          <div className='table-box'>
            <table className='table-work'>
              <tbody>
                <tr>
                  <th className='table-head'>Male</th>
                  <td className='tab-dat-mal1'>0-10</td>
                  <td className='tab-dat-mal2'>11-20</td>
                  <td className='tab-dat-mal3'>21-40</td>
                  <td className='tab-dat-mal4'>41-60</td>
                  <td className='tab-dat-mal5'>61-80</td>
                  <td className='tab-dat-mal6'>&#62;80</td>
                </tr>
                <tr>
                  <th className='table-head'>Female</th>
                  <td className='tab-dat-fe1'>0-10</td>
                  <td className='tab-dat-fe2'>11-20</td>
                  <td className='tab-dat-fe3'>21-40</td>
                  <td className='tab-dat-fe4'>41-60</td>
                  <td className='tab-dat-fe5'>61-80</td>
                  <td className='tab-dat-fe6'>&#62;80</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='map'>
        <Maps data={deathAgeSexValue} />
      </div>
    </div>
    <div className='graphs'>
      <div className='bar-graph'>
        <DeathAgeChart data={deathAgeSexValue} />
      </div>
      <div className='circular-graph'>
        <PieChart pieData={pieValue} />
      </div>
    </div>

    </div>
    <div className='graph'>
        <DeathDays setSelectedValue={setSelectedRangeValue}/>
    </div>
  </div>)
}

export default App;
