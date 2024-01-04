import { Card } from 'antd';

import { PageWrapper } from '@/components/Page';

import { FORM_CREATE_DESIGNER } from '@/settings/websiteSetting';

import type { FC } from 'react';

const FormCreate: FC = () => (
    <PageWrapper plugin={FORM_CREATE_DESIGNER}>
      <Card bordered={false}></Card>
    </PageWrapper>
);

export default FormCreate;
