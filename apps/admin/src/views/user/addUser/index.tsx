import { Card, Col, Flex, Row, Upload } from 'antd';
import { SvgIcon, Translatex } from 'ui';

import useStyles from './style';

import type { FC } from 'react';

interface PAddUser {
  onAdd?: (user: any) => void;
}

const AddUser: FC<PAddUser> = ({ onAdd = () => {} }) => {
  const { Dragger } = Upload;
  const { styles } = useStyles();
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
                将图片拖到此处, 或<span style={{ color: '#1890ff;' }}>点击上传</span>
              </p>
              <p className='ant-upload-hint'>只能上传jpg、jpeg、gif、png、bmp文件, 且不超过500kb</p>
            </Dragger>
          </Card>
        </Col>
        <Col span={16}>2</Col>
      </Row>
    </Translatex>
  );
};
export default AddUser;
