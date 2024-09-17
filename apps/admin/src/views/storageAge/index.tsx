import { Badge, Divider } from 'antd';
import dayjs from 'dayjs';
import {
  GAction,
  GButton,
  GCtrl,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
} from 'gbeata';
import { useEffect, useMemo, useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetPageInventoryYear } from '@/api/summary';

export default function Demo() {
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  const [warehouseCode, setWarehouseCode] = useState('');
  // 当前时间
  const currentDate = dayjs();
  const fields: Array<GSearchTableField> = [
    {
      title: '物料名称',
      key: 'materialName',
      render: (text, record, index) => {
        const { receivingData } = record;
        const parsedEntryDate = dayjs(receivingData);
        const mouth = currentDate.diff(parsedEntryDate, 'month');
        let color;
        if (mouth > 3 && mouth < 6) {
          color = 'yellow';
        } else if (mouth > 6 && mouth < 12) {
          color = 'red';
        } else if (mouth > 12) {
          color = 'purple';
        } else {
          color = '';
        }
        return (
          <span>
            {color ? <Badge color={color} /> : null}
            {text}
          </span>
        );
      },
    },
    {
      title: '组织',
      key: 'orgName',
    },
    {
      title: '仓库',
      key: 'warehouseName',
    },
    {
      title: '仓库',
      key: 'warehouseCode',
      type: 'select-search',
      options: warehouseOptions,
      search: {
        onChange: (value, _) => {
          setWarehouseCode(value);
        },
      },
      table: false,
    },
    {
      title: '物料编号',
      key: 'materialCode',
      search: true,
    },
    {
      title: '规格',
      key: 'materialSize',
    },
    {
      title: '库存数量',
      key: 'quantity',
    },
    {
      title: '入库时间',
      key: 'receivingData',
    },
    {
      title: '当前库龄',
      key: 'inventoryYear',
      render: (text, record, index) => <span>{`${text} /天`}</span>,
    },
  ];

  const ctrl: GTableCtrlField = {
    render: (_, record: Record) => (
      <GCtrl>
        <GAction record={record} action='view'>
          详情
        </GAction>
        <GAction record={record} action='update'>
          编辑
        </GAction>
      </GCtrl>
    ),
  };

  const handleDownload = () => {
    let fileName = '全部';
    if (activeOrgCode && !warehouseCode) {
      fileName = orgOptions.find((item) => item.value === activeOrgCode)?.label;
    } else if (activeOrgCode && warehouseCode) {
      fileName = `${orgOptions.find((item) => item.value === activeOrgCode)?.label}-${warehouseOptions.find((item) => item.value === warehouseCode)?.label}`;
    }
    downloadFile({
      fileUrl: '/Summary/ExportInventoryYear',
      fileName: `${fileName}.xls`,
      // eslint-disable-next-line no-nested-ternary
      postData: { orgCode: activeOrgCode, warehouseCode: '' },
    });
  };

  useEffect(() => {
    // window.location.href = '/login';
  }, []);

  return (
    <GSearchTable
      api={GetPageInventoryYear}
      fields={fields}
      rowKey='sort_id'
      extendSearchParams={{ orgCode: activeOrgCode }}
      dialogFormExtend={{
        fields,
      }}
      title={
        <>
          库龄图例：<Badge color='yellow' text={<span>三月</span>}></Badge>
          <Divider type='vertical' />
          <Badge color='red' text={<span>半年</span>}></Badge>
          <Divider type='vertical' />
          <Badge color='purple' text={<span>一年</span>}></Badge>
        </>
      }
    >
      <GButton type='primary' onClick={handleDownload}>
        {'导出'}
      </GButton>
    </GSearchTable>
  );
}
