import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useIntl } from 'dumi';
import type { FC } from 'react';

import { memo, useMemo } from 'react';

import { Flexbox } from 'react-layout-kit';
import { useStyles } from './Linker.style';

interface LinkerProps {
  title: string;
  link: string;
  type?: 'prev' | 'next';
}

const Linker: FC<LinkerProps> = ({ title, link, type }) => {
  const { styles, cx } = useStyles();
  const intl = useIntl();
  const navContent = useMemo(() => {
    switch (type) {
      case 'prev':
        return (
          <>
            <ArrowLeftOutlined /> {intl.formatMessage({ id: 'content.footer.actions.previous' })}
          </>
        );
      case 'next':
        return (
          <>
            {intl.formatMessage({ id: 'content.footer.actions.next' })} <ArrowRightOutlined />
          </>
        );
    }
  }, [type]);

  return (
    <Link to={link}>
      <Flexbox className={styles.container} gap={8}>
        <Flexbox
          horizontal
          gap={4}
          className={cx(styles.nav, type === 'next' && styles.alignmentEnd)}
        >
          {navContent}
        </Flexbox>
        <Flexbox horizontal className={cx(styles.title, type === 'next' && styles.alignmentEnd)}>
          {title}
        </Flexbox>
      </Flexbox>
    </Link>
  );
};

export default memo(Linker);
