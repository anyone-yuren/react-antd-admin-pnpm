import Konva from 'konva';
import React, { FC, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import Element from './Elements';
import { Position, TYPE_ENUM } from './types';
import { useCreator } from './useCreator';

interface CreateEditorProps extends Record<string,any> {
  type: keyof typeof TYPE_ENUM,
  creating: boolean,
  onFinish?:(position: Position)=>void
}

const CreateEditor:FC<CreateEditorProps> = ({ type, creating, onFinish, ...rest }) => {

  
  const { position, mouseDownHandler, mouseMoveHandler, mouseUpHandler } = useCreator();

  const isDrawingRef = useRef(false)

  const handleMouseDown = (e: Konva.KonvaEventObject<Event>) => {
    if (creating) {
      isDrawingRef.current = true
      mouseDownHandler(e);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<Event>) => {
    if (creating && isDrawingRef.current) {
      mouseMoveHandler(e);
    }
  };

  const handleMouseUp = (e: Konva.KonvaEventObject<Event>) => {
    if (creating && isDrawingRef.current) {
      isDrawingRef.current = false
      mouseUpHandler(e);
      onFinish?.(position);
    }
  };

  const { start, end } = position;
  const width = Math.abs(start.x - end.x);
  const height = Math.abs(start.y - end.y);

  console.log({startX:start.x,startY:start.y,endX:end.x,endY:end.y,width,height})

  return (
    <Stage
      width={window.innerHeight}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        <Element type={type} {...rest} x={start.x} y={start.y} width={width} height={height} />
      </Layer>
    </Stage>
  );
};

export default CreateEditor;
