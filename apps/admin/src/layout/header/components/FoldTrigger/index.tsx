import SvgIcon from '@/components/SvgIcon';

import { useSettingActions, useSettings } from '@/stores/modules/settingStore';

import useStyles from './index.module.style';

export default function FoldTrigger() {
  const { styles, cx } = useStyles();
  const settings = useSettings();
  // 小知识，大智慧~
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  function toggledMenuFold() {
    setSettings({ ...settings, unfold: !settings.unfold });
  }

  return (
    <span className={cx(styles['compo_fold-trigger'], { [styles.unfold]: !settings.unfold })} onClick={toggledMenuFold}>
      <SvgIcon name='unfold' size={20} />
    </span>
  );
}
