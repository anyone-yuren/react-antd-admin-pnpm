import type { FC } from 'react';

interface PUSerList {
  data?: {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };
}

const UserList: FC<PUSerList> = ({ data = { id: 0, name: '', email: '', avatar: '' } }) => (
  <div>
    <div>{data.id}</div>
    <div>{data.name}</div>
    <div>{data.email}</div>
    <div>{data.avatar}</div>
  </div>
);
export default UserList;
