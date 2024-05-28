import React, { FC } from 'react';
import { TYPE_ENUM } from '../types';
import Rect from './Rect';

const ELEMENT_TYPES = {
  [TYPE_ENUM.rect]: Rect,
};

interface IProps extends Record<string,any>  {
  type: keyof typeof TYPE_ENUM
}

const Element:FC<IProps> = ({type,...rest}) => {

  const Shape = ELEMENT_TYPES[type]

  console.log({Shape,type})

  return <Shape {...rest}/>
};

export default Element;
