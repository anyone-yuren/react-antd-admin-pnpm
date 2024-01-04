import { GButton } from 'gbeata';

const GbeataForm = () => {
  const fields: Array<any> = [
    {
      title: '中文名',
      key: 'cn',
    },
    {
      title: '年龄',
      type: 'slider',
      key: 'sex',
    },
  ];
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <GButton style={{ marginLeft: 120 }} type='primary' htmlType='submit'>
      提交
    </GButton>
  );
};

export default GbeataForm;
