import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ColumnHeightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Checkbox, Dropdown, Input, Space, Tooltip } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import GButton from '../../GButton';
import GDialog from '../../GDialog';
import { GTableField } from '../../GTable/g-table';
import locale from '../../locale';
import { GSearchTableProps, SearchTableInitConfig } from '../g-search-table';

/** 表格扩展按钮-是否显示 */
let defaultConfig: SearchTableInitConfig = {
  /** 扩展栏是否显示 */
  extraVisible: true,
  /** 扩展栏【刷新】按钮是否显示 */
  extraRefreshVisible: true,
  /** 扩展栏【密度】按钮是否显示 */
  extraSizeVisible: true,
  /** 扩展栏【密度】按钮默认值 */
  extraSizeDefaultValue: 'large',
  /** 扩展栏【展示列】按钮是否显示 */
  extraSettingVisible: true,
  /** 扩展栏【全屏】按钮是否显示 */
  extraFullscreenVisible: true,
};
interface FieldEdit {
  /** 是否选中 */
  checked: boolean;
  /** 标题 */
  title: string;
  /** field 的 key */
  key: string;
  /** 顺序 order */
  order: number;
  /** 别名 */
  alias: string;
  /** 是否隐藏 niyonggui tag */
  hidden?: boolean;
}

export const setSearchTableExtraDefaultValue = (
  config: SearchTableInitConfig,
) => {
  defaultConfig = Object.assign({}, defaultConfig, config);
};

const useFieldsEdit = (
  tableFields: Array<GTableField>,
  setTableFields: Dispatch<React.SetStateAction<GTableField[]>>,
  defaultExtra: string[],
) => {
  const [open, setVisible] = useState<boolean>(false);
  let [normalFields, setNormalFields] = useState<Array<FieldEdit>>(
    // @ts-ignore
    tableFields
      .filter((field) => {
        // 已经设置过展示的，直接通过判定
        if (field.__extraTouched) {
          return true;
        }
        return !field.hidden;
      })
      .map((field, i) => {
        return {
          checked: defaultExtra.includes(field?.key ?? '')
            ? false
            : field.__hidden === false || field.__hidden === undefined,
          title: field.title || '',
          key: field.key || '',
          order: field.__order ?? i,
          alias: field.__alias || '',
        };
      }),
  );
  useEffect(() => {
    if (defaultExtra && defaultExtra.length) {
      setTimeout(() => {
        handleConfirm();
      }, 800);
    }
    // setTableFields(normalFields)
  }, [defaultExtra]);

  const handleCheckedChange = (i: number, value: boolean) => {
    // @ts-ignore
    let newFields = [...normalFields];
    let fieldEdit = newFields[i];
    fieldEdit.checked = value;
    setNormalFields(newFields);
  };

  const handleAliasChange = (i: number, value: string) => {
    let newFields = [...normalFields];
    let fieldEdit = newFields[i];
    fieldEdit.alias = value || '';
    setNormalFields(newFields);
  };

  /**
   * 向上移动元素位置
   * @param i 当前位置
   */
  const handleMoveUp = (i: number) => {
    if (i === 0) {
      return;
    }
    const newFields = [...normalFields];
    const current = newFields[i];
    const prev = newFields[i - 1];
    let currentOrder = current.order;
    current.order = prev.order;
    prev.order = currentOrder;
    [newFields[i], newFields[i - 1]] = [newFields[i - 1], newFields[i]];
    setNormalFields(newFields);
  };

  /**
   * 向下移动元素位置
   * @param i 当前位置
   */
  const handleMoveDown = (i: number) => {
    if (i === normalFields.length - 1) {
      return;
    }
    const newFields = [...normalFields];
    // 赋值 order
    const current = newFields[i];
    const next = newFields[i + 1];
    let currentOrder = current.order;
    current.order = next.order;
    next.order = currentOrder;
    [newFields[i], newFields[i + 1]] = [newFields[i + 1], newFields[i]];
    setNormalFields(newFields);
  };

  /**
   * 确认修改
   */
  const handleConfirm = () => {
    let newFields = [...tableFields];
    newFields
      .filter((field) => {
        // 已经设置过展示的，直接通过判定
        if (field.__extraTouched) {
          return true;
        }
        return !field.hidden;
      })
      .forEach((field) => {
        let target: FieldEdit | undefined = normalFields.find(
          (item: FieldEdit) => item.key === field.key,
        );
        if (target) {
          field.__extraTouched = true;
          field.__hidden = !target.checked;
          field.__order = target.order;
          field.__alias = target.alias;
        }
      });
    setTableFields(newFields);
    setVisible(false);
  };

  /**
   *  设置初始选中
   */
  const setDefaultField = (defaultArray: string[] = ['receiptName']) => {};

  return {
    fieldsEdit: (
      <>
        <GDialog
          title={locale.extra.columnSetting}
          open={open}
          setVisible={setVisible}
          onConfirm={handleConfirm}
        >
          {normalFields.map((fieldEdit: FieldEdit, i: number) => {
            return (
              !fieldEdit.hidden && (
                <div
                  className="g-search-table-extra-fields-edit-line"
                  key={fieldEdit.key}
                >
                  <div className="g-search-table-extra-fields-edit-line-left">
                    <Checkbox
                      defaultChecked={fieldEdit.checked}
                      onChange={(e) => handleCheckedChange(i, e.target.checked)}
                    >
                      {fieldEdit.title}
                    </Checkbox>
                  </div>
                  <div className="g-search-table-extra-fields-edit-line-right">
                    <Input
                      style={{ marginRight: 20 }}
                      value={fieldEdit.alias}
                      placeholder={locale.extra.rename}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleAliasChange(i, e.target.value)
                      }
                      allowClear
                    />
                    <Tooltip title={locale.extra.moveUp} placement="left">
                      <GButton
                        type="link"
                        icon={<ArrowUpOutlined />}
                        onClick={() => handleMoveUp(i)}
                      ></GButton>
                    </Tooltip>
                    <Tooltip title={locale.extra.moveDown} placement="right">
                      <GButton
                        type="link"
                        icon={<ArrowDownOutlined />}
                        onClick={() => handleMoveDown(i)}
                      ></GButton>
                    </Tooltip>
                  </div>
                </div>
              )
            );
          })}
        </GDialog>
        <Tooltip title={locale.extra.columnSetting}>
          <SettingOutlined onClick={() => setVisible(true)} />
        </Tooltip>
      </>
    ),
    setDefaultField,
  };
};

export default function useExtraBtn(
  tableRef: any,
  searchRef: any,
  tableFields: Array<GTableField>,
  setTableFields: Dispatch<React.SetStateAction<GTableField[]>>,
  props: GSearchTableProps,
) {
  // 合并配置
  const config = Object.assign({}, defaultConfig, props);
  const {
    extraVisible,
    extraRefreshVisible,
    extraSizeVisible,
    extraSizeDefaultValue,
    extraSettingVisible,
    extraFullscreenVisible,
  } = config;
  /** 表格尺寸 */
  const [size, setSize] = useState<SizeType>(extraSizeDefaultValue);
  /** 表格全屏 */
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const { fieldsEdit, setDefaultField } = useFieldsEdit(
    tableFields,
    setTableFields,
    props.defaultExtra || [],
  );

  const handleRefresh = () => {
    tableRef.current.refresh();
  };

  const handleSizeChange = (e: any) => {
    setSize(e.key);
  };

  useEffect(() => {
    // body 的 style 防止滚动
    if (isEnter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    searchRef.current && searchRef.current.resize();
  }, [isEnter]);

  const extraBtns = extraVisible ? (
    <div className="g-search-table-extra-btns" key="g-search-table-extra-btns">
      <Space size="middle">
        {extraRefreshVisible ? (
          <Tooltip title={locale.extra.refresh}>
            <ReloadOutlined onClick={handleRefresh} />
          </Tooltip>
        ) : null}

        {extraSizeVisible ? (
          <Tooltip title={locale.extra.density}>
            <Dropdown
              menu={{
                style: { width: 100 },
                selectedKeys: [size + ''],
                onClick: handleSizeChange,
                items: [
                  {
                    key: 'large',
                    label: locale.extra.densityLarger,
                  },
                  {
                    key: 'middle',
                    label: locale.extra.densityMiddle,
                  },
                  {
                    key: 'small',
                    label: locale.extra.densitySmall,
                  },
                ],
              }}
            >
              <ColumnHeightOutlined />
            </Dropdown>
          </Tooltip>
        ) : null}

        {extraSettingVisible ? fieldsEdit : null}

        {extraFullscreenVisible ? (
          isEnter ? (
            <Tooltip
              title={locale.extra.exitFullScreen}
              key={locale.extra.exitFullScreen}
            >
              <FullscreenExitOutlined
                className="g-search-table-fullscrenn-enter"
                onClick={() => setIsEnter(false)}
              />
            </Tooltip>
          ) : (
            <Tooltip
              title={locale.extra.fullScreen}
              key={locale.extra.fullScreen}
            >
              <FullscreenOutlined
                className="g-search-table-fullscrenn-out"
                onClick={() => setIsEnter(true)}
              />
            </Tooltip>
          )
        ) : null}
      </Space>
    </div>
  ) : null;

  return {
    extraBtns,
    isEnter,
    setIsEnter,
    size,
    setDefaultField,
  };
}
