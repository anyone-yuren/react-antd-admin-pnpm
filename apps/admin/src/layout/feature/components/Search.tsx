import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';

import SearchModal, { type SearchModalMethods } from '@/components/SearchModal';

const GlobalSearch = () => {
  const modalRef = useRef<SearchModalMethods>(null);
  return (
    <>
      <Button size='small' shape='circle' onClick={() => modalRef.current?.open()} icon={<SearchOutlined />} />
      <SearchModal ref={modalRef} />
    </>
  );
};

export default GlobalSearch;
