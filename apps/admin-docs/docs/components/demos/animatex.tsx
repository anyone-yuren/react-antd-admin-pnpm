import { Translatex } from 'ui';
import { Center } from 'react-layout-kit';
import React from 'react';
import { Switch } from 'antd';

export default () => {
  const [run, setRun] = React.useState(true);
  return (
    <>
      <Switch checked={run} onChange={(e) => setRun(e)} />
      <Center style={{ height: '30vh' }}>
        <Translatex run={run} delay={100}>
          <img
            src="https://github.com/anyone-yuren/multiway/blob/master/logo.png?raw=true"
            alt=""
          />
        </Translatex>
      </Center>
    </>
  );
};
