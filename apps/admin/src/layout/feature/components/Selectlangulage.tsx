import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { Switch } from 'antd';

const Selectlangulage = () => {
  const { t, i18n } = useTranslation();
  return (
    <Switch
      checkedChildren={t('中文')}
      unCheckedChildren={'English'}
      defaultChecked
      onChange={(checked) => i18n.changeLanguage(checked ? 'zh' : 'en')}
    />
  );
};

export default Selectlangulage;
