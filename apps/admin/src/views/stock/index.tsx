import {
  GAction,
  GButton,
  GCtrl,
  GDialogForm,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
} from 'gbeata';
import { useRef, useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetRealtimeInventories, uploadStock } from '@/api/summary';

import { listApi } from './api';
import Dragger from 'antd/es/upload/Dragger';
import { CloudUploadOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import { UploadChangeParam } from 'antd/es/upload';
import { message } from 'antd';
import { useExcel } from '../excel/useExcel';
import { ColumnType } from 'antd/es/table';
import { Upload } from 'antd/lib';
import dayjs from 'dayjs';

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

export default function Stock() {
  const [warehouseCode, setWarehouseCode] = useState('');
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const tableRef = useRef<any>();

  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      width: '120px',
      key: 'orgName',
    },
    {
      title: '仓库',
      key: 'warehouseName',
      width: '120px',
      search: false,
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
      title: '物料名称',
      width: '120px',
      key: 'materialName',
      search: true,
    },
    {
      title: '物料编码',
      key: 'materialCode',
      width: '220px',
      search: true,
    },
    {
      title: '库位编码',
      key: 'locationCode',
      width: '220px',
      search: true,
    },
    {
      title: '型号',
      key: 'materialModel',
    },
    {
      title: '规格',
      width: '120px',
      key: 'materialSize',
    },
    {
      title: '单价 （元）',
      key: 'unitPriceStr',
      width: '120px',
    },
    {
      title: '数量',
      key: 'quantity',
      width: '120px',
    },
    {
      title: '金额 (元)',
      key: 'amountStr',
      width: '120px',
    },
    {
      title: '批次',
      key: 'batchNumber',
      search: true,
      width: '120px',
    },
    {
      title: '总价',
      key: 'amountStr',
      width: '120px',
    },
    {
      title: '供应商',
      width: '220px',
      key: 'supplierName',
      search: true,
    },
    {
      title: '供应商编码',
      width: '220px',
      key: 'supplierCode',
      search: true,
    },
    {
      title: '收货日期',
      width: '220px',
      key: 'receivedDate',
      render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : ''),
    },
  ];

  const handleDownload = async (obj) => {
    let fileName = '全部';
    if (activeOrgCode && !warehouseCode) {
      fileName = orgOptions.find((item) => item.value === activeOrgCode)?.label;
    } else if (activeOrgCode && warehouseCode) {
      fileName = `${orgOptions.find((item) => item.value === activeOrgCode)?.label}-${warehouseOptions.find((item) => item.value === warehouseCode)?.label}`;
    }
    await downloadFile({
      fileUrl: '/DataCenter/ExportRealtimeInventories',
      fileName: `${fileName}.xls`,
      // eslint-disable-next-line no-nested-ternary
      postData: { orgCodes: obj.orgCode, warehouseCode: '' },
    });
  };
  
  const [uploading, setUploading] = useState(false);
  function handleChange(fileParam: UploadChangeParam) {
    const { file } = fileParam;
    const rawFile = file.originFileObj;

    if (!rawFile) return;
    if (!/\.(xlsx|xls|csv)$/.test(rawFile.name)) {
      message.warning(t('Excel文件只支持.xlsx, .xls, .csv格式!'));
      return;
    }

    // const isLimit1M = rawFile.size / 1024 / 1024 < 1;
    // if (!isLimit1M) {
    //   message.warning(t('上传的Excel文件大小不能超过1M!'));
    //   return;
    // }

    console.log('rawFile = ', rawFile, file, fileParam)

    // readFile(rawFile);
    if (file.status === 'done') {
      message.success('上传成功!');
      tableRef.current.refresh();
    }
  }
  return (
    <>
      <GSearchTable
        api={GetRealtimeInventories}
        extendSearchParams={{ orgCode: activeOrgCode }}
        ref={tableRef}
        fields={fields}
        rowKey='sort_id'
        dialogFormExtend={{
          fields,
        }}
        tableExtend={{
          bordered: true,
          scroll: { x: 2200 },
        }}
      >
        {/* <Dragger accept='.xlsx, .xls, .csv' showUploadList={false} maxCount={1} onChange={handleChange}>
          <p className='ant-upload-drag-icon' style={{ marginBottom: 0 }}>
            <CloudUploadOutlined rev={undefined} />
          </p>
          <p>
            {t('将Excel文件拖到此处, 或')}
            <span style={{ color: '#1890ff' }}>{t('点击上传')}</span>
          </p>
        </Dragger> */}
        <Upload
          accept='.xlsx, .xls, .csv'
          showUploadList={false}
          maxCount={1}
          onChange={handleChange}
          customRequest={async (e) => {
            const { file } = e;
            setUploading(true);
            const formData = new FormData();
            formData.append('formFile', file);
            const r = await uploadStock(formData);
            setUploading(false);
            // console.log('customRequest = ', r)

            message.success(r?.message || '导入成功');
            tableRef.current.refresh();
          }}
          disabled={uploading}
        >
          <GButton loading={uploading}>导入</GButton>
        </Upload>
        <GButton type='primary' onClick={() => setOpen(true)}>
          {'导出'}
        </GButton>
      </GSearchTable>
      <GDialogForm
        open={open}
        width={'70%'}
        mode='add'
        onClose={() => setOpen(false)}
        title='导出'
        initialValues={initialValues}
        addApi={handleDownload}
        fields={[
          {
            title: '组织',
            key: 'orgCode',
            type: 'checkbox-group',
            required: true,
            options: orgOptions,
          },
          {
            type: 'checkbox',
            key: 'remember',
            style: {
              marginLeft: 120,
            },
            onChange: (value) => {
              if (typeof value === 'boolean') {
                if (value) {
                  setInitialValues({
                    ...initialValues,
                    remember: true,
                    orgCode: orgOptions.map((item) => item.key),
                  });
                } else {
                  setInitialValues({
                    ...initialValues,
                    remember: false,
                    orgCode: [],
                  });
                }
              }
            },
            children: '全选',
          },
        ]}
      ></GDialogForm>
    </>
  );
}
