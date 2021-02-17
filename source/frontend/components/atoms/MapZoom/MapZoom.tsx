import React from 'react';
import { CustomEventHandler, useZoomPan } from '../../hooks';

export interface IMapZoomProps {
  center?: number[];
  zoom?: number;
  width?: number;
  height?: number;
  minZoom?: number;
  maxZoom?: number;
  projection?: any;
  translateExtent?: any;
  onMoveStart?: CustomEventHandler;
  onMove?: CustomEventHandler;
  onMoveEnd?: CustomEventHandler;
  className?: string;
  filterZoomEvent?: any;
  children: any;
}

export const MapZoom = ({
  width,
  height,
  projection,
  center = [0, 0],
  zoom = 1,
  minZoom = 1,
  maxZoom = 8,
  translateExtent,
  filterZoomEvent,
  onMoveStart,
  onMove,
  onMoveEnd,
  className,
  children,
  ...restProps
}: IMapZoomProps): JSX.Element => {
  const { mapRef, transformString } = useZoomPan({
    width,
    height,
    projection,
    center,
    filterZoomEvent,
    onMoveStart,
    onMove,
    onMoveEnd,
    scaleExtent: [minZoom, maxZoom],
    translateExtent,
    zoom,
  });

  return (
    <g ref={mapRef}>
      <rect width={width} height={height} fill="transparent" />
      <g transform={transformString} className={`rsm-zoomable-group ${className}`} {...restProps}>
        {children}
      </g>
    </g>
  );
};
