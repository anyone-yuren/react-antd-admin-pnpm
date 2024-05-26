import { Button } from 'antd';
import { BasicModal } from 'KellyCOM';
import React, { useState } from 'react';

const Demo = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        打开可拖拽弹出框
      </Button>
      <BasicModal
        open={open}
        width="50%"
        title="可拖拽弹出框"
        onCancel={handleCancel}
      >
        <div>此弹出框头部可自由拖拽</div>
      </BasicModal>
    </div>
  );
};

export default Demo;
