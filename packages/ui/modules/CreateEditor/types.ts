export interface Point {
  x: number;
  y: number;
}

export interface Position {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export enum TYPE_ENUM  {
  rect = 'rect',
}