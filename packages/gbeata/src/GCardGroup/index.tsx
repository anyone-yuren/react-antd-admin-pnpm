import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import { Option } from '../GForm/g-form';
import { FORM_DEFAULT_VALUE_CARD_GROUP } from '../constant';
import useStyles from './style';

type ValueType = Array<string | number> | string | number | undefined;

export interface GCardGroupProps {
  value?: any;
  onChange?: (values: ValueType) => void;
  /** 是否支持选择多个 */
  multiple?: boolean;
  /** 选项 */
  options?: Array<Option>;
  /** 是否只读 */
  readonly?: boolean;
  /** 尺寸 */
  size?: 'default' | 'large';
  /** 卡片样式 */
  cardStyle?: CSSProperties;
  /** 是否可以取消 */
  cancelable: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Returns the cover node for the given option.
 * @param option - The option object.
 * @param props - The props object.
 * @param styles - The styles object.
 * @returns The cover node or `null`.
 */
const getCoverNode = (
  option: Option,
  props: GCardGroupProps,
  styles: any,
): React.ReactNode | null => {
  const { size } = props;
  return option.cover ? (
    <div
      className={classNames(
        `${styles.gCardGroup}-cover`,
        !option.label && !option.description && `${styles.gCardGroup}-no-info`,
      )}
    >
      {typeof option.cover === 'string' ? (
        <img
          src={option.cover}
          width={size === 'large' ? 48 : 24}
          height={size === 'large' ? 48 : 24}
          alt=""
          draggable={false}
        />
      ) : (
        option.cover
      )}
    </div>
  ) : null;
};

export default function GCardGroup(props: GCardGroupProps) {
  const { styles } = useStyles();
  const {
    value = [],
    onChange,
    options,
    size = 'default',
    readonly,
    multiple = false,
    cardStyle,
    cancelable = true,
    className,
    style,
  } = props;

  const handleSelect = (option: Option) => {
    // 禁用和只读不处理
    if (option.disabled || readonly) {
      return;
    }
    const triggerChange = (value: any) => {
      if (onChange) {
        onChange(value);
      }
    };
    if (multiple && Array.isArray(value)) {
      // 多选
      if (value.includes(option.value)) {
        triggerChange(value.filter((v) => v !== option.value));
      } else {
        triggerChange([...value, option.value]);
      }
    } else {
      // 单选
      if (option.value === value) {
        if (cancelable) {
          triggerChange(FORM_DEFAULT_VALUE_CARD_GROUP);
        }
      } else {
        triggerChange(option.value);
      }
    }
  };

  return (
    <ul
      className={classNames(
        className,
        styles.gCardGroup,
        styles.gCardGroup + '-' + size,
        readonly && `${styles.gCardGroup}-readonly`,
        multiple && `${styles.gCardGroup}-multiple`,
      )}
      style={style}
    >
      {(options || []).map((option) => (
        <li
          className={classNames(
            `${styles.gCardGroup}-option`,
            (multiple
              ? value.includes(option.value)
              : value === option.value) && `${styles.gCardGroup}-option-active`,
            option.description && `${styles.gCardGroup}-option-has-desc`,
            option.disabled === true && `${styles.gCardGroup}-option-disabled`,
          )}
          key={option.value}
          style={cardStyle}
          onClick={() => handleSelect(option)}
        >
          {getCoverNode(option, props, styles)}
          {(!!option.label || !!option.description) && (
            <div className={`${styles.gCardGroup}-info`}>
              {!!option.label && (
                <div className={`${styles.gCardGroup}-title`}>
                  {option.label}
                </div>
              )}
              {!!option.description && (
                <div className={`${styles.gCardGroup}-desc`}>
                  {option.description}
                </div>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
