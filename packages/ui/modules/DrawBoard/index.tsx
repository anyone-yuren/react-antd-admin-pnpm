import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

interface DrawingBoardProps {
  stroke?: string;
  strokeWidth?: number;
}
const DrawingBoard: React.FC<DrawingBoardProps> = ({ stroke = '#df4b26', strokeWidth = 5 }) => {
  const [lines, setLines] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const { x, y } = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [x, y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const newPoint = e.target.getStage().getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([newPoint.x, newPoint.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
    }}>
      <Stage
        width={window.innerWidth}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke={stroke} strokeWidth={strokeWidth} tension={0.5} lineCap='round' />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingBoard;
