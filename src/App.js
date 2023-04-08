import logo from './logo.svg';
import './App.css';
import React, { createRef, useEffect } from 'react';
import mapboxgl from "mapbox-gl";
import streets from './streets.json';
import pumps from './pumps.json';
//import Swatches from './Swatches';
import DeathDays from './DateDeath';
import PieChart from './PieChart';
import DeathAgeChart from './DeathAgeChart';
import deathAgeSex from './deathagesex.json'

mapboxgl.accessToken = "pk.eyJ1IjoieWlpdSIsImEiOiJjazJvMmJ3M2QwejYzM21tdWdiZzR6cmUwIn0.XolZlohi-gYoIdMoen7Gyg";


function App() {

  const container = createRef();

  const initMap = (mapBox, coordinate) => new mapboxgl.Map({
    container: mapBox,
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinate,
    zoom: 10
  });


  const [pieChartValue, setPieChartValue] = React.useState([])

  const [deathAgeValue, setDeathAge] = React.useState([])

  const getStreetsCoordinate = () => {

    return streets.reduce((acc, initial) => {
      let coordinate = initial.map((item) => {
        return [item.x, item.y]
      })
      acc.push(...coordinate);
      return acc;
    }, [])
  }

  const getPumpsCoordinate = () => {
    let pumpCoordinate = pumps.reduce((acc, initialValue) => {
      acc.push([initialValue.x, initialValue.y])
      return acc;
    }, []);
    return pumpCoordinate;
  }

  const setChartData = (coor, pumpsCoor) => {

    const filteredArray = pumpsCoor.map((item, idx) => {
      const sliceIdx = idx * 42;
      let offset = (idx + 1) * 42;
      if (deathAgeSex.length === idx + 1) {
        offset = deathAgeSex.length - 1
      }
      return deathAgeSex.slice(sliceIdx, offset).map((val) => ({ ...val, x: item[0], y: item[1] }))
    });



    let fileterdData = filteredArray.filter((item) => item[0].x === coor[0] && item[0].y === coor[1])

    const pieValues = fileterdData[0].reduce((acc, init) => {
      if (init.gender) acc[1] = { name: 'female', y: acc[1].y + 1 }
      else acc[0] = { name: 'male', y: acc[0].y + 1 }

      return acc;

    }, [{ name: 'male', y: 0 }, { name: 'female', y: 0 }]) || []

    const ageDeath = fileterdData[0].reduce((acc, init) => {

      if (!acc.length) {
        acc.push({ age: init.age, value: 1 })
        return acc;
      }
      else {
        if (acc.find((val) => val.age === init.age)) {
          return acc.map((item) => {
            if (item.age === init.age) {
              return { ...item, value: item.value + 1 }
            }
            return item
          })
        }
        acc.push({ age: init.age, value: 1 })
        return acc;
      }
    }, [])
    setPieChartValue(pieValues)
    setDeathAge(ageDeath)
  }

  const pumpCoordinates = getPumpsCoordinate();

  const [mapCoordinate, setMapCoordinate] = React.useState(pumpCoordinates[0]);

  React.useEffect(() => {

    setChartData(mapCoordinate, pumpCoordinates)

  }, [mapCoordinate])


  const geojson = {
    'type': 'FeatureCollection',
    'pumps': pumpCoordinates.map(item => ({
      'type': 'Pump',
      'properties': {
        'message': 'Foo',
        'iconSize': [100, 100]
      },
      'geometry': {
        'type': 'Point',
        'coordinates': item
      }
    }))
  };


  useEffect(() => {
    if (container.current) {

      const map = initMap(container.current, pumpCoordinates[0]);

      for (const marker of geojson.pumps) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.innerHTML = '<i class="fa-solid fa-square"></i>';
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        el.addEventListener('click', () => {
          setMapCoordinate(marker.geometry.coordinates)
        });

        // Add markers to the map.
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      }

      map.on('load', () => {
        map.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [...getStreetsCoordinate()]
            }
          }
        });
        map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#888',
            'line-width': 5
          }
        });
      });

    }
    return () => {
      container.current = null
    }
  }, []);


  return (<div className='main-layout'>
    <div className='legend-graphs'>
      <div className='map-legend'>
        <div className='map-caption'>
          <h6>Map legend</h6>
        </div>
        <div className='list-table'>
          <div className='symbols'>
            <ul className='symbol-list'>
              <li><i class="fa-solid fa-square"></i> Death</li>
              <li><i class="fa-solid fa-square"></i> Pump</li>
              <li><i class="fa-solid fa-square"></i> Brewery</li>
              <li><i class="fa-solid fa-square"></i>Work House</li>
            </ul>
          </div>
          <div className='table-box'>
            <table className='table-work'>
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

            </table>
          </div>
        </div>
      </div>
      <div className='map' ref={container} />
      <div className='graph'>
        <DeathDays />
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

  </div>)
}

export default App;
