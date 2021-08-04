import { useEffect, useRef, useState } from 'react';
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from 'd3-zoom';
import { select as d3Select } from 'd3-selection';

const getCoords = (w: number, h: number, t: any) => {
  const xOffset = (w * t.k - w) / 2;
  const yOffset = (h * t.k - h) / 2;
  return [w / 2 - (xOffset + t.x) / t.k, h / 2 - (yOffset + t.y) / t.k];
};

export type CustomEventHandler = (coordinates: any, event: any) => void;

export interface IUseZoomPanProps {
  width: number;
  height: number;
  projection: any;
  center: number[];
  filterZoomEvent: (event: any) => void;
  onMoveStart: CustomEventHandler;
  onMoveEnd: CustomEventHandler;
  onMove: CustomEventHandler;
  translateExtent: any;
  scaleExtent: number[];
  zoom: number;
}

export const useZoomPan = ({
  width,
  height,
  projection,
  center,
  filterZoomEvent,
  onMoveStart,
  onMoveEnd,
  onMove,
  translateExtent = [
    [-Infinity, -Infinity],
    [Infinity, Infinity],
  ],
  scaleExtent = [1, 8],
  zoom = 1,
}: IUseZoomPanProps): any => {
  const [lon, lat] = center;
  const [position, setPosition] = useState<any>({ x: 0, y: 0, k: 1 });
  const lastPosition = useRef({ x: 0, y: 0, k: 1 });
  const mapRef = useRef();
  const zoomRef = useRef();
  const bypassEvents = useRef(false);

  const [a, b] = translateExtent;
  const [a1, a2] = a;
  const [b1, b2] = b;
  const [minZoom, maxZoom] = scaleExtent;

  useEffect(() => {
    const svg = d3Select(mapRef.current);

    const handleZoomStart = (d3Event) => {
      // console.log('handleZoomStart', d3Event);
      if (!onMoveStart || bypassEvents.current) return;
      onMoveStart(
        { coordinates: projection.invert(getCoords(width, height, d3Event.transform)), zoom: d3Event.transform.k },
        d3Event
      );
    };

    const handleZoom = (d3Event) => {
      // console.log('handleZoom', d3Event);
      if (bypassEvents.current) return;
      const { transform, sourceEvent } = d3Event;
      setPosition({ x: transform.x, y: transform.y, k: transform.k, dragging: sourceEvent });
      if (!onMove) return;
      onMove({ x: transform.x, y: transform.y, k: transform.k, dragging: sourceEvent }, d3Event);
    };

    const handleZoomEnd = (d3Event) => {
      // console.log('handleZoomEnd', d3Event);
      if (bypassEvents.current) {
        bypassEvents.current = false;
        return;
      }
      const [x, y] = projection.invert(getCoords(width, height, d3Event.transform));
      lastPosition.current = { x, y, k: d3Event.transform.k };
      if (!onMoveEnd) return;
      onMoveEnd({ coordinates: [x, y], zoom: d3Event.transform.k }, d3Event);
    };

    const filterFunc = (d3Event) => {
      filterZoomEvent && filterZoomEvent(d3Event);
      return d3Event ? !d3Event.ctrlKey && !d3Event.button : false;
    };

    const zoom = d3Zoom()
      .filter(filterFunc)
      .scaleExtent([minZoom, maxZoom])
      .translateExtent([
        [a1, a2],
        [b1, b2],
      ])
      .on('start', handleZoomStart)
      .on('zoom', handleZoom)
      .on('end', handleZoomEnd);

    zoomRef.current = zoom;
    svg.call(zoom);
  }, [width, height, a1, a2, b1, b2, minZoom, maxZoom, projection, onMoveStart, onMove, onMoveEnd, filterZoomEvent]);

  useEffect(() => {
    if (lon === lastPosition.current.x && lat === lastPosition.current.y && zoom === lastPosition.current.k) return;

    const coords = projection([lon, lat]);
    const x = coords[0] * zoom;
    const y = coords[1] * zoom;
    const svg = d3Select(mapRef.current);

    bypassEvents.current = true;

    svg.call((zoomRef.current as any).transform, d3ZoomIdentity.translate(width / 2 - x, height / 2 - y).scale(zoom));
    setPosition({ x: width / 2 - x, y: height / 2 - y, k: zoom });

    lastPosition.current = { x: lon, y: lat, k: zoom };
  }, [lon, lat, zoom, width, height, projection]);

  return {
    mapRef,
    position,
    transformString: `translate(${position.x} ${position.y}) scale(${position.k})`,
  };
};
