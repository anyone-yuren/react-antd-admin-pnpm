import { Alert } from 'antd';
import { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import type { AlertProps } from 'antd';
import type { CSSProperties, ReactElement } from 'react';

const generateComponent = function generateComponent(ele: ReactElement) {
  const container = document.createElement('div');
  document.body.append(container);
  const root = ReactDOM.createRoot(container);
  root.render(ele);
  return () => {
    root.unmount();
    container.remove();
  };
};

/** Toast is based on alert component */
export const useToast = function useToast({
  interval,
  alertStyleProps,
}: {
  interval: number;
  alertStyleProps?: CSSProperties;
}) {
  const ref = useRef<any>();

  const alertStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    transform: 'translate(0, 50%)',
    left: '50%',
    ...alertStyleProps,
  };

  const toast = useCallback(
    (props: AlertProps) => {
      if (!ref.current) {
        ref.current = generateComponent(<Alert {...props} style={alertStyle} role='toast' />);

        setTimeout(() => {
          ref.current();
          ref.current = null;
        }, interval);
      }
    },
    [interval],
  );

  return toast;
};
