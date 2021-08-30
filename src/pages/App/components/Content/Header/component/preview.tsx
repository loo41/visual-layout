import { EyeOutlined } from '@ant-design/icons';
import { Checkbox, Popover, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useState } from 'react';
import { PreviewStyle } from 'src/const';
import { PagesService } from 'src/controller';

const Styles = [
  {
    title: '边框',
    style: {
      key: 'border',
      value: '1px dashed #000000',
    },
  },
  {
    title: '外边距',
    css: {
      key: 'padding',
      value: '5px',
    },
  },
  {
    title: '背景色',
    css: {
      key: 'background',
      value: 'white',
    },
  },
];

const Preview: React.FC<{ pagesService: PagesService }> = ({ pagesService }) => {
  const page = pagesService.getCurrentPage();
  const options = page?.options;

  return (
    <Popover
      content={
        <Checkbox.Group
          value={options?.previewStyle.map(({ key }) => key)}
          style={{ width: '100%' }}
          onChange={(checkedValue: CheckboxValueType[]) => {
            page.setOptions({
              previewStyle: PreviewStyle.filter(({ key }) =>
                checkedValue.includes(key),
              ),
            });
          }}
        >
          {PreviewStyle.map(style => {
            return (
              <Row key={style.key}>
                <Checkbox value={style.key}>{style?.title}</Checkbox>
              </Row>
            );
          })}
        </Checkbox.Group>
      }
      title="预览样式设置"
      placement="bottom"
    >
      <EyeOutlined style={{ fontSize: 20 }} />
    </Popover>
  );
};

export default Preview;