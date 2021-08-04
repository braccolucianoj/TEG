import React, { createContext } from 'react';

interface IProjectionConfig {
  dimensions: { width: number; height: number };
  center: [number, number];
  rotate: [number, number, number];
  parallels: [number, number];
  scale: number;
}

export interface IMapContextInfo {
  projection: (prop: any) => void;
  projectionConfig: IProjectionConfig;
}

type PartialContextInfo = {
  [P in keyof IMapContextInfo]: IMapContextInfo[P];
};

export interface IMapContext extends IMapContextInfo {
  setContextInfo: (prop: PartialContextInfo) => void;
}

const MapContext = createContext<IMapContext>({} as IMapContext);

// const makeProjection = ({ projectionConfig = {}, projection = 'geoEqualEarth', width = 800, height = 600 }) => {
//   const isFunc = typeof projection === 'function';

//   if (isFunc) return projection;

//   let proj = [projection]().translate([width / 2, height / 2]);

//   const supported = [
//     proj.center ? 'center' : null,
//     proj.rotate ? 'rotate' : null,
//     proj.scale ? 'scale' : null,
//     proj.parallels ? 'parallels' : null,
//   ];

//   supported.forEach((d) => {
//     if (!d) return;
//     proj = proj[d](projectionConfig[d] || proj[d]());
//   });

//   return proj;
// };

const defaultDimension = { width: 800, height: 600 };

const MapProvider = ({ projection, projectionConfig, children, ...restProps }: any): JSX.Element => {
  const { width, height } = projectionConfig.dimension || defaultDimension;
  const [cx, cy] = projectionConfig.center || [];
  const [rx, ry, rz] = projectionConfig.rotate || [];
  const [p1, p2] = projectionConfig.parallels || [];
  const s = projectionConfig.scale || null;

  //   const projMemo = useMemo(() => {
  //     return makeProjection({
  //       projectionConfig: {
  //         center: cx || cx === 0 || cy || cy === 0 ? [cx, cy] : null,
  //         rotate: rx || rx === 0 || ry || ry === 0 ? [rx, ry, rz] : null,
  //         parallels: p1 || p1 === 0 || p2 || p2 === 0 ? [p1, p2] : null,
  //         scale: s,
  //       },
  //       projection,
  //       width,
  //       height,
  //     });
  //   }, [width, height, projection, cx, cy, rx, ry, rz, p1, p2, s]);

  //   const proj = useCallback(projMemo, [projMemo]);

  //   const value = useMemo(() => {
  //     return {
  //       width,
  //       height,
  //       projection: proj,
  //     //   path: geoPath().projection(proj),
  //     };
  //   }, [width, height, proj]);

  return (
    <MapContext.Provider value={{} as IMapContext} {...restProps}>
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
