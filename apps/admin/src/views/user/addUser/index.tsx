import type { FC } from 'react';

interface PAddUser {
  onAdd?: (user: any) => void;
}

const AddUser: FC<PAddUser> = ({ onAdd = () => {} }) => {
  console.log(onAdd);

  return (
    <div>
      <div>添加用户</div>
    </div>
  );
};
export default AddUser;
