import { Tag } from 'antd';
import classNames from 'classnames';

import useStyles from './index.module.style';

import type { FC } from 'react';

interface PropState {
  name: string;
  fixed?: boolean;
  active?: boolean;
  closeTag: () => void;
  onClick: () => void;
}

const TagItem: FC<PropState> = ({
  name, fixed, active = false, closeTag, onClick,
}) => {
  const { styles } = useStyles({ active });
  return (
    <Tag
      className={classNames(styles['compo_tag-item'], { [styles.active]: active })}
      closable={!fixed}
      onClose={closeTag}
      onClick={onClick}
    >
      <span className={`${styles['compo_tag-item']}__dot`} />
      <span className={`${styles['compo_tag-item']}__name`}>{name}</span>
    </Tag>
  );
};

export default TagItem;
