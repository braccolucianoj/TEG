import React from 'react';
import { ComposableMap, Geographies, Geography, Annotation } from 'react-simple-maps';

// url to a valid topojson file
const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapPage = () => {
  return (
    <div>
      {/* <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}
        </Geographies>
      </ComposableMap> */}
      <ComposableMap
        projection=""
        projectionConfig={{
          rotate: [-20.0, -52.0, 0],
          scale: 0,
        }}
      >
        <Geographies geography={geoUrl} fill="#D6D6DA" stroke="#FFFFFF" strokeWidth={0.5}>
          {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}
        </Geographies>
        <Annotation
          subject={[2.3522, 48.8566]}
          dx={-90}
          dy={-30}
          connectorProps={{
            stroke: '#FF5533',
            strokeWidth: 3,
            strokeLinecap: 'round',
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {'Paris'}
          </text>
        </Annotation>
      </ComposableMap>
    </div>
  );
};

export default MapPage;
