import { Card, Col, Flex, Row, Tag, Upload } from 'antd';
import { GButton, GForm } from 'gbeata';
import { useNavigate } from 'react-router-dom';
import { SvgIcon, Translatex } from 'ui';

import useStyles from './style';

import type { FormValues } from 'gbeata/lib/types/FormValues';
import type { FC } from 'react';

interface PAddUser {
  onAdd?: (user: any) => void;
}

const AddUser: FC<PAddUser> = () => {
  const navigate = useNavigate();
  const { Dragger } = Upload;
  const { styles } = useStyles();
  const fields = [
    {
      title: '全名',
      key: 'input',
      required: true,
      defaultValue: 'Gbeata',
    },
    {
      title: '密码',
      type: 'password',
      key: 'password',
      defaultValue: 'gbeata',
    },
    {
      title: '城市',
      type: 'select',
      key: 'select',
      defaultValue: 1,
      options: [
        { label: <Tag>选项A</Tag>, value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
    {
      title: '电话号码',
      key: 'number',
      required: true,
      defaultValue: 15305999999,
    },
    {
      title: '地址',
      type: 'textarea',
      key: 'textarea',
      defaultValue: '广东省深圳市南山区科技园',
      span: 24,
    },
  ];

  const onFinish = (form: FormValues) => {
    console.log(form);
    navigate('/user/user-list');
  };
  return (
    <Translatex direction='left' run={true} delay={100}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Dragger
              // defaultFileList={dragImgs}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              accept='.jpg, .jpeg, .gif, .png, .bmp'
              multiple
              className={styles['custom-upload-drag']}
            >
              <div className='add-phone-box'>
                <Flex align='center' vertical justify='center' className='add-phone'>
                  <SvgIcon name='camera' size={24} />
                  <span>upload phone</span>
                </Flex>
              </div>
              <p>
                将图片拖到此处, 或<span style={{ color: '#1890ff' }}>点击上传</span>
              </p>
              <p className='ant-upload-hint'>只能上传jpg、jpeg、gif、png、bmp文件, 且不超过500kb</p>
            </Dragger>
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <GForm fields={fields} span={12} onConfirm={onFinish}>
              <Flex justify='end' className={styles['btn-submit']}>
                <GButton type='primary' htmlType='submit'>
                  创建用户
                </GButton>
              </Flex>
            </GForm>
          </Card>
        </Col>
      </Row>
    </Translatex>
  );
};
export default AddUser;
