import classNames from 'classnames';

import SvgIcon from '@/components/SvgIcon';

import { useAppDispatch, useAppSelector } from '@/stores';
import { setAppConfig } from '@/stores/modules/app';

import style from './index.module.less';

export default function FoldTrigger() {
  const getMenuFold = useAppSelector((state) => state.app.appConfig?.menuSetting?.menuFold);
  const dispatch = useAppDispatch();

  function toggledMenuFold() {
    dispatch(setAppConfig({ menuSetting: { menuFold: !getMenuFold } }));
  }

  return (
    <span
      className={classNames(style['compo_fold-trigger'], { [style.unfold]: !getMenuFold })}
      onClick={toggledMenuFold}
    >
      <SvgIcon name="unfold" size={20} />
    </span>
  );
}
