import './planisphere.style.scss';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { geoCylindricalStereographic, geoMiller, geoPatterson } from 'd3-geo-projection';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { Country, ICountryInfo } from '../../atoms/Country';
import { neighbouringRelations } from '../../../services/topology/relations.topology';
import { MapZoom } from '../../atoms/MapZoom';

const width = 1359;
const height = 769;

const cylindricalStereographicProjection = geoCylindricalStereographic()
  .parallel(38.5)
  .scale(160)
  .translate([width / 2, height / 1.7]);
const pattersonProjection = geoPatterson().translate([width / 2, height / 1.7]);
const millerProjection = geoMiller()
  .scale(200)
  .translate([width / 2, 400]);

const transformToCountryInfo = (info: any): ICountryInfo => {
  const name = _.get(info, 'properties.name');
  const alpha2 = _.get(info, 'properties.alpha2');
  const continent = _.get(info, 'properties.continent');
  const id = _.get(info, 'id');
  return { name, alpha2, id, continent };
};

export interface IPlanispherePorps {
  topology: any;
}

export default ({ topology }: IPlanispherePorps): JSX.Element => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState<string | undefined>();
  const [countryRelations, setCountryRelations] = useState({});

  useEffect(() => {
    setCountries(feature(topology, topology.objects.countries).features);
    // setCountries(feature(topology, topology.objects.countries).features);
  }, []);

  useEffect(() => {
    if (selectedCountryID) {
      setCountryRelations(neighbouringRelations[selectedCountryID]);
    } else {
      setCountryRelations({});
    }
  }, [selectedCountryID]);

  const handleCountryClick = (countryID: string) => {
    const value = selectedCountryID === countryID ? undefined : countryID;
    setSelectedCountryID(value);
  };

  return (
    <div>
      <svg height={height} width={width} className="rsm-svg" viewBox={`0 0 ${width} ${height}`}>
        <MapZoom
          translateExtent={[[-100, -100], [[width, height]]]}
          zoom={1}
          width={width}
          height={height}
          projection={millerProjection}
        >
          <g className="countries">
            {countries.map((d, countryIndex) => {
              const countryInfo = transformToCountryInfo(d);
              return (
                <Country
                  key={`path-${countryInfo.alpha2}`}
                  color={`rgba(38,50,56,${(1 / countries.length) * countryIndex})`}
                  countryIndex={countryIndex}
                  onClick={() => handleCountryClick(countryInfo.id)}
                  svgDInfo={geoPath().projection(millerProjection)(d)}
                  countryInfo={countryInfo}
                  selected={countryInfo.id === selectedCountryID}
                  selectedNeighbour={countryRelations[countryInfo.id]}
                />
              );
            })}
          </g>
          <g className="relations">{}</g>
        </MapZoom>
      </svg>
    </div>
  );
};
