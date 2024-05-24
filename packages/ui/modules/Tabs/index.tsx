import React, { type MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import useStyles from './style';

interface Items {
  key: string;
  label: string;
  children: string | JSX.Element;
}

interface Props {
  defaultActiveKey?: string;
  items: Items[];
  onChange: (key: string) => void;
}

export default function Tabs({ defaultActiveKey, items, onChange }: Props) {
  const [key, setKey] = useState(defaultActiveKey || '');
  const [selectedChild, setSelectedChild] = useState<string | JSX.Element | null>(null);

  const itemMap = useMemo(() => new Map(items.map((item) => [item.key, item])), [items]);

  useEffect(() => {
    if (defaultActiveKey) {
      const foundChild = itemMap.get(defaultActiveKey)?.children;

      if (foundChild) {
        setSelectedChild(foundChild);
      }
    }
  }, [defaultActiveKey, itemMap, setSelectedChild]);

  const { styles } = useStyles();

  const handleItemClick: MouseEventHandler<HTMLLIElement> = useCallback(
    (e) => {
      const targetAsHTMLElement = e.target as HTMLElement;
      const k = targetAsHTMLElement.dataset?.key;
      if (k && k !== key) {
        setKey(k);
        onChange(k);
        setSelectedChild(itemMap.get(k)?.children || null);
      }
    },
    [onChange, key, itemMap],
  );

  const tabClassNames = useMemo(() => ({
    active: (k: string) => (k === key ? 'active' : ''),
  }), [key]);

  return (
    <>
      <ul className={styles.tab}>
        {items.map((child) => {
          const childKey = child.key;
          return (
            <li
              key={childKey}
              data-key={`${childKey}`}
              onClick={handleItemClick}
              className={tabClassNames.active(childKey)}
            >
              {child.label}
            </li>
          );
        })}
      </ul>

      {key && selectedChild && (
        <div>
          { selectedChild}
        </div>
      )}
    </>
  );
}
