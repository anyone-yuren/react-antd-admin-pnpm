import { PointCloud } from 'ui';
import React from 'react';

export default () => {
  return (
    <>
      <PointCloud pointCount={100000} pointSize={1} onSelectionChange={(indices) => {
        console.log('选中的点索引:', indices);
      }} />
    </>
  );
};
