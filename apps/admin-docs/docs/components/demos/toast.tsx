import { useToast } from 'ui';
import React, { useCallback } from 'react';

export default () => {
  const toast = useToast({interval: 1000});

  const handleSuccessClick = useCallback(()=>{
    toast({
      type: 'success',
      message: 'success toast'
    });
  }, []);
  const handleErrorClick = useCallback(()=>{
    toast({
      type: 'error',
      message: 'error toast'
    });
  }, []);

  return (
    <>
      <button onClick={handleSuccessClick}>show success toast</button>
      <button onClick={handleErrorClick}>show error toast</button>
    </>
  );
}