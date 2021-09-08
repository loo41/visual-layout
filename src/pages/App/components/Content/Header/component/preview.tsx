import { EyeOutlined } from '@ant-design/icons';
import { Checkbox, Popover, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { PagesService } from 'src/controller';

const Preview: React.FC<{ pagesService: PagesService }> = ({ pagesService }) => {
  const page = pagesService.getCurrentPage();
  const options = page?.options;

  return (
    <Popover
      content={
        <Checkbox.Group
          value={options?.previewStyle
            .filter(({ isCanUse }) => isCanUse)
            .map(({ key }) => key)}
          style={{ width: '100%' }}
          onChange={(checkedValue: CheckboxValueType[]) => {
            page.setOptions({
              previewStyle: options?.previewStyle.map(option => {
                return {
                  ...option,
                  isCanUse: checkedValue.includes(option.key) ? true : false,
                };
              }),
            });
          }}
        >
          {options?.previewStyle.map(style => {
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
