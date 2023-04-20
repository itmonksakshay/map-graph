import React from 'react';
import * as d3 from 'd3';

export default function MapLegend() {

    const container = React.useRef(null)


    return (
    <svg style={{marginLeft:"1rem"}} height={60} width={345}>
                <circle cx="15" cy="15" r="10" stroke="black" strokeWidth="3" fill="red" /><text style={{fill:"black"}} x="32" y="10">Deaths</text>
              <rect x="3" y="30" width="25" height="25" style={{fill:"black"}} /><text style={{fill:"black"}} x="32" y="30">Pumps</text>
              <rect x="3" y="30" width="25" height="25" style={{fill:"yello"}} /><text style={{fill:"black"}} x="32" y="30">Brewery</text>
        </svg>)
}