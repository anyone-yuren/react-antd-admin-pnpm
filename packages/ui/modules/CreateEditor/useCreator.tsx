import Konva from 'konva';
import { useState } from 'react';
import { Point, Position } from './types';

function getPositionFromEvent(e: Konva.KonvaEventObject<Event>) {
  const node = e.currentTarget;
  const start = node.getRelativePointerPosition();
  return start as unknown as Point;
}

const DEFAULT_POINT = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };

export function useCreator() {
  const [position, setPosition] = useState<Position>(DEFAULT_POINT);

  const mouseDownHandler = (e: Konva.KonvaEventObject<Event>) => {
    const start = getPositionFromEvent(e);
    setPosition({ start, end: start });
  };

  const mouseMoveHandler = (e: Konva.KonvaEventObject<Event>) => {
    const { start, end } = calcBoundary(e);
    setPosition({ start, end });
  };

  const mouseUpHandler = (e: Konva.KonvaEventObject<Event>) => {
    const { start, end } = calcBoundary(e);
    setPosition({ start, end });
  };

  const calcBoundary = (e: Konva.KonvaEventObject<Event>) => {
    const start = position.start;
    const end = getPositionFromEvent(e);

    return { start, end };
  };

  return {
    position,
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
  };
}
