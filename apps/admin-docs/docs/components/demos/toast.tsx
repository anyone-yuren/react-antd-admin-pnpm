import {useState,useCallback,ChangeEvent} from 'React'
import { Toast } from 'ui'

export default () => {
  const [val, setVal] = useState('');
  const handleInput = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[val])
  const handleSave = useCallback(() => {
    if (!val) {
      Toast.message('请输入一些值啦', {
        type: 'error',
        zIndex: 100
      });
     return
    }  
    Toast.message('保持成功', {
      type: 'correct',
      zIndex: 100
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[val])
  return (
    <>
      <input type="text" value={val} onChange={handleInput} />
      <button onClick={ handleSave}>保存</button>
    </>
  );
};