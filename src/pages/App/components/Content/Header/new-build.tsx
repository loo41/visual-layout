import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { PreviewStyle, SelectStyle } from 'src/const';
import { models } from 'src/const/container';
import { PagesService } from 'src/controller';
import Size from './component/size';

export interface Values {
  name: string;
  canvas: {
    height: string;
    width: string;
  };
}

export interface Canvas {
  height: string;
  width: string;
  key: string;
}

export const CreateModal: React.FC<{ pagesService: PagesService }> = ({
  pagesService,
}) => {
  const [visible, setVisible] = useState(true);

  const checkCanvas = (_: any, value: Canvas) => {
    if (value.height !== '0' && value.width !== '0') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('未设置画布大小'));
  };

  const createPage = (values: Values) => {
    pagesService.cerate({
      name: values.name,
      page: {
        _name: 'div',
        type: 'Element',
        styles: [
          {
            key: 'height',
            value: `${values.canvas.height}px`,
          },
          {
            key: 'width',
            value: `${values.canvas.width}px`,
          },
          {
            key: 'background',
            value: 'white',
          },
          {
            key: 'overflow',
            value: 'auto',
          },
        ],
        children: [],
      },
      selectStyle: SelectStyle,
      previewStyle: PreviewStyle,
    });
    setVisible(false);
  };

  return (
    <Modal
      title="新建布局"
      visible={visible}
      onOk={() => {}}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          name: '',
          canvas: models[0],
        }}
        onFinish={createPage}
        onFinishFailed={() => {}}
      >
        <Form.Item
          label="布局名称"
          name="name"
          rules={[{ required: true, message: '请输入布局名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="画布大小"
          name="canvas"
          rules={[{ required: true, validator: checkCanvas }]}
        >
          <Size />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            style={{ marginRight: 10 }}
            onClick={() => setVisible(false)}
          >
            取消
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
            确认
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const openNewBuildModal = (props: { pagesService: PagesService }) => {
  return new Promise<boolean>(() => {
    const el = document.createElement('div');
    ReactDOM.render(<CreateModal {...props} />, el);
  });
};

export default openNewBuildModal;
