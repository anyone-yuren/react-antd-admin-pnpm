import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

const BlankPage: FC = () => (
  <div className='flex-center' style={{ width: '100%', height: '500px', fontSize: '32px' }}>
    {t('空页面')}
  </div>
);

export default BlankPage;
