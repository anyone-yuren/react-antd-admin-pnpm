import type { FC } from 'react';

interface PUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const User: FC<PUser> = ({ id, name, email, avatar }) => {
  console.log(id, name, email, avatar);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{email}</div>
      <div>{avatar}</div>
    </div>
  );
};

export default User;
