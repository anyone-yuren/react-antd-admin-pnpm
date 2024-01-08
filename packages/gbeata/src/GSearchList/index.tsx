import { Space } from 'antd';
import React, {
  ForwardRefExoticComponent,
  MutableRefObject,
  ReactNode,
  Ref,
  RefAttributes,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getActionProps } from '../GAction';
import GButton from '../GButton';
import GDialogForm from '../GDialogForm';
import { GDialogFormRef } from '../GDialogForm/g-dialog-form';
import { convertChildrenToField } from '../GFields/convertFields';
import GForm, { getDefaultValue } from '../GForm';
import GList from '../GList';
import GSearch from '../GSearch';
import { GSearchField } from '../GSearch/g-search';
import { GSearchTableContext } from '../GSearchTable/context';
import {
  GSearchTableField,
  SortItem,
  TableRefProps,
} from '../GSearchTable/g-search-table';
import useExtraBtn from '../GSearchTable/use/useExtraBtn';
import useSelection from '../GSearchTable/use/useSelection';
import { GTableField } from '../GTable/g-table';
import { AnyKeyProps } from '../types/AnyKeyProps';
import { isObj } from '../utils';
import Selection from './Selection';
import SelectionAll from './SelectionAll';
import { GSearchListProps } from './g-search-list';

import './g-search-list.less';

export { Selection, SelectionAll };

/**
 * 转化并过滤成 g-search 能用的 fields
 * @param fields 查询表格的 fields
 */
const getSearchFields = (fields: Array<GSearchTableField>) => {
  let searchFields: Array<GSearchField> = [];
  let moreSearchFields: Array<GSearchField> = [];
  fields
    .filter((field: GSearchTableField) => {
      return isObj(field.search) || field.search === true;
    })
    .forEach((field: GSearchTableField) => {
      let search = typeof field.search === 'boolean' ? {} : field.search;
      if (!search) {
        return {
          title: '配置有误',
          key: 'xxx',
          type: 'input',
        };
      }
      let searchField: GSearchField = {
        title: field.title,
        key: search.key || field.key || '',
        type: field.type || 'input',
        options: field.options || [],
        ...search,
      };
      if (field.children) {
        searchField.children = field.children;
      }
      if (searchField.position === 'more') {
        moreSearchFields.push(searchField);
      } else {
        searchFields.push(searchField);
      }
    });
  return {
    searchFields,
    moreSearchFields,
  };
};

/**
 * 判断该节点是否只出现在底部
 * @param node GAction 按钮
 */
const isFooterActionOnly = (node: any) => {
  if (!node || !node.props) {
    return false;
  }
  const props = getActionProps(node.props, {});
  return props.tableFooterExtraOnly === true;
};

/**
 * 获取表格底部以及右侧 GAction 按钮
 * @param node GAction 按钮
 */
const getTableActionBtns = (
  children: ReactNode,
): { footerActions: Array<ReactNode>; rightActions: Array<ReactNode> } => {
  /** 右侧按钮 */
  const footerActions: Array<ReactNode> = [];
  /** 底部按钮 */
  const rightActions: Array<ReactNode> = [];
  if (Array.isArray(children)) {
    children.forEach((node: any) => {
      if (isFooterActionOnly(node)) {
        footerActions.push(node);
      } else if (node) {
        rightActions.push(node);
      }
    });
  } else {
    if (isFooterActionOnly(children)) {
      footerActions.push(children);
    } else if (children) {
      rightActions.push(children);
    }
  }
  return {
    rightActions,
    footerActions,
  };
};

function GSearchList(props: GSearchListProps, ref: Ref<any>) {
  const {
    fields: originFields,
    api,
    deleteApi,
    children,
    data,
    title,
    ctrl,
    selectionType,
    onSelectionChange,
    rowKey,
    dialogFormExtend,
    scrollX,
    height,
    filterData,
    beforeSearch,
    selectShowKey,
    center,
    onLoad,
    searchVisible,
    listExtend,
    pagination,
    btnBefore,
    extendSearchParams,
    after,
    before,
    editMode,
    autoload,
    rowSelection,
    searchExtend,
    renderItem,
    onParamsChange,
    listHeader,
  } = props;

  const fields = useMemo(() => {
    const childrenFields = convertChildrenToField(children);
    return [...(originFields || []), ...childrenFields];
  }, [originFields, children]);

  /** form 控制 */
  const formRef: MutableRefObject<GDialogFormRef> =
    useRef() as MutableRefObject<GDialogFormRef>;
  /** table 控制 */
  const tableRef: MutableRefObject<TableRefProps> =
    useRef() as MutableRefObject<TableRefProps>;
  /** search 控制 */
  const searchRef: MutableRefObject<AnyKeyProps> =
    useRef() as MutableRefObject<TableRefProps>;
  /** search 控制 */
  const moreSearchRef: MutableRefObject<AnyKeyProps> =
    useRef() as MutableRefObject<TableRefProps>;
  /** 查询项 */
  const { searchFields, moreSearchFields } = getSearchFields(fields);
  /** 列表项 */
  const [tableFields, setTableFields] = useState<Array<GTableField>>([]);
  /** 使用勾选 */
  const {
    header,
    message,
    tableRowSelection,
    selection,
    clearSelection,
    setSelection,
    addSelection,
    removeSelection,
  } = useSelection({
    rowKey,
    selectionType,
    onSelectionChange,
    selectShowKey,
    rowSelection,
  });
  /** action 展示，底部 or 右侧 */
  const { footerActions, rightActions } = getTableActionBtns(children);
  const { extraBtns, size, isEnter } = useExtraBtn(
    tableRef,
    searchRef,
    tableFields,
    setTableFields,
    {
      ...props,
      extraSizeVisible: false,
      extraSettingVisible: false,
    },
  );

  /** 查询完成，刷新列表 */
  const onConfirm = () => {
    // 更多查询数据
    let moreSearchValues = moreSearchRef.current?.getFieldsValue() || {};
    // 头顶查询数据
    let searchValues = searchRef.current?.getFieldsValue() || {};
    // 合并查询
    tableRef.current.reset({
      ...moreSearchValues,
      ...searchValues,
    });
  };

  /** 暴露方法 */
  useImperativeHandle(ref, () => ({
    /**
     * 刷新页面
     */
    refresh() {
      tableRef.current.refresh();
    },
    /**
     * 回到第一页，刷新页面
     */
    reset() {
      // 跟点击【查询】逻辑一致
      onConfirm();
    },
    /**
     * 清空选项
     */
    clearSelection() {
      clearSelection();
    },
    /**
     * 获取 search 对象
     */
    getSearchRef() {
      return searchRef.current;
    },
    /**
     * 获取 moreSearch 对象，表格右侧查询框
     */
    getMoreSearchRef() {
      return moreSearchRef.current;
    },
    /**
     * 获取已经选中的对象
     */
    getSelection() {
      return selection;
    },
    /**
     * 设置选中的行
     */
    setSelection,
    /**
     * 添加选中的行
     */
    addSelection,
    /**
     * 获取表格数据
     */
    getTableData() {
      return tableRef.current.getTableData();
    },
    /**
     * 清空过滤
     * @param keys
     */
    clearFilters(keys: Array<string> = []) {
      return tableRef.current.clearFilters(keys);
    },
    /**
     * 设置过滤值
     * @param filters 需要设置的过滤值，{ key: value } 格式
     */
    setFiltersValue(filters: AnyKeyProps) {
      return tableRef.current.setFiltersValue(filters);
    },
    /**
     * 设置排序值
     * @param sorts [{ key, order }] 组成格式
     */
    setSortsValue(sorts: Array<SortItem>) {
      return tableRef.current.setSortsValue(sorts);
    },
    /**
     * 清空排序
     * @param keys
     */
    clearSorts(keys: Array<string> = []) {
      return tableRef.current.clearSorts(keys);
    },
    /** 获取请求前参数 */
    getApiParams() {
      return tableRef.current.getApiParams();
    },
  }));

  const listProps: AnyKeyProps = {
    ref: tableRef,
    rowSelection: tableRowSelection,
    listHeader,
    api,
    size,
    data,
    title,
    ctrl,
    rowKey,
    scrollX,
    height,
    filterData,
    beforeSearch,
    onLoad,
    listExtend,
    pagination,
    // @ts-ignore
    defaultSearchValue: getDefaultValue([...searchFields, ...moreSearchFields]),
    btnBefore,
    editMode,
    extendSearchParams,
    autoload,
    onParamsChange,
  };

  /** 列表子元素 */
  const tableChildren = useMemo(() => {
    const children = [];
    if (moreSearchFields && moreSearchFields.length) {
      children.push(
        <GForm
          className="g-search-list-more"
          key="g-search-list-more"
          ref={moreSearchRef}
          fields={moreSearchFields}
          onConfirm={onConfirm}
        >
          <GButton
            className="g-search-list-more-submit"
            htmlType="submit"
          ></GButton>
        </GForm>,
      );
    }
    if (rightActions && rightActions.length) {
      children.push(rightActions);
    }
    if (extraBtns) {
      children.push(extraBtns);
    }
    if (children.length === 1) {
      return children[0];
    }

    return children.length ? children : null;
  }, [moreSearchRef, moreSearchFields, onConfirm, rightActions, extraBtns]);

  return (
    <div className={`g-search-list ${isEnter ? 'full' : ''}`}>
      <GSearchTableContext.Provider
        value={{
          formRef,
          tableRef,
          selection,
          deleteApi,
          rowKey,
          setSelection,
          clearSelection,
          addSelection,
          removeSelection,
          searchTableRef: ref,
        }}
      >
        {before}
        {searchVisible !== false && searchFields.length > 0 ? (
          <GSearch
            ref={searchRef}
            fields={searchFields}
            onConfirm={onConfirm}
            {...searchExtend}
          />
        ) : null}
        {center}
        {dialogFormExtend ? (
          <GDialogForm ref={formRef} dialogOnly {...dialogFormExtend}>
            {children}
          </GDialogForm>
        ) : null}
        <GList
          {...listProps}
          fields={tableFields}
          renderItem={renderItem}
          header={header}
        >
          {tableChildren}
        </GList>
        {selection.length && footerActions.length ? (
          <div className="g-search-list-footer-actions">
            {message}
            <Space>{footerActions}</Space>
          </div>
        ) : null}
        {after}
      </GSearchTableContext.Provider>
    </div>
  );
}

let component: ForwardRefExoticComponent<
  GSearchListProps & RefAttributes<any>
> = forwardRef(GSearchList);
export default component;
