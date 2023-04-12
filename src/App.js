import logo from './logo.svg';
import './App.css';
import React, { createRef, useEffect } from 'react';
import mapboxgl from "mapbox-gl";
//import Swatches from './Swatches';
import DeathDays from './DateDeath';
import deathDays from './deathDays.json';
import PieChart from './PieChart';
import DeathAgeChart from './DeathAgeChart';
import deathAgeSex from './deathagesex.json'
import Maps from './Maps';



function App() {

  const [pieChartValue, setPieChartValue] = React.useState([])

  const [deathAgeValue, setDeathAge] = React.useState([])

  return (<div className='main-layout'>
    <div className="container-layout">
    <div className='legend-graphs'>
      <div className='map-legend'>
        <div className='map-caption'>
          <h6>Map legend</h6>
        </div>
        <div className='list-table'>
          <div className='symbols'>
            <ul className='symbol-list'>
              <li><i className="fa-solid fa-square"></i> Death</li>
              <li><i className="fa-solid fa-square"></i> Pump</li>
              <li><i className="fa-solid fa-square"></i> Brewery</li>
              <li><i className="fa-solid fa-square"></i>Work House</li>
            </ul>
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
        <Maps />
      </div>
    </div>
    <div className='graphs'>
      <div className='bar-graph'>
        <DeathAgeChart data={deathAgeValue} />
      </div>
      <div className='circular-graph'>
        <PieChart data={pieChartValue} />
      </div>
    </div>

    </div>
    <div className='graph'>
        <DeathDays />
    </div>

  </div>)
}

export default App;
