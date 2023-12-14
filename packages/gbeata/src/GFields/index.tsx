import React from 'react';

export interface GFieldsCompProps {
  // Define your component props here
  children: React.ReactNode;
}

const GFields: React.FC<GFieldsCompProps> = (props) => {
  // Your component logic here
  return null;
};

// Adding a static property to the function component
(GFields as any).componentName = 'GFields';

export default GFields;
