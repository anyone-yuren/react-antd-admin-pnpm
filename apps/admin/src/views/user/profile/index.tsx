import UserCard from '../components/userCard';

import type { FC } from 'react';

interface PProFile {}

const User: FC<PProFile> = () => {
  console.log('');

  return <UserCard></UserCard>;
};

export default User;
