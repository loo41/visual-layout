import { CloseOutlined } from '@ant-design/icons';
import { InputNumber, Select } from 'antd';
import { Canvas } from '../new-build';
import styles from '../index.module.scss';
import { models } from 'src/const/container';

const { Option } = Select;

interface SizeProps {
  value?: Canvas;
  onChange?: (value: Canvas) => void;
}

const Size: React.FC<SizeProps> = ({ value, onChange }) => {
  return (
    <>
      <Select
        defaultValue={models[0].key}
        onChange={key => {
          const modal = models.find(modal => modal.key === key);
          onChange?.({
            key: modal?.key || 'custom',
            width: modal?.width || value?.width || '0',
            height: modal?.height || value?.height || '0',
          });
        }}
      >
        <>
          <Option value="custom">自定义</Option>
          {models.map(({ key }) => {
            return (
              <Option value={key} key={key}>
                {key}
              </Option>
            );
          })}
        </>
      </Select>
      <div className={styles.inputNumbers}>
        <InputNumber
          min={0}
          value={value?.width ?? 0}
          formatter={value => `${value}px`}
          disabled={value?.key !== 'custom'}
          parser={value => value?.replace('px', '') || ''}
          onChange={width => {
            if (width) {
              onChange?.({
                key: 'custom',
                width: `${String(width)}`,
                height: value?.height || '0',
              });
            }
          }}
        />
        <span className={styles.close}>
          <CloseOutlined />
        </span>
        <InputNumber
          min={0}
          value={value?.height ?? 0}
          formatter={value => `${value}px`}
          disabled={value?.key !== 'custom'}
          parser={value => value?.replace('px', '') || ''}
          onChange={height => {
            if (height) {
              onChange?.({
                key: 'custom',
                width: value?.width || '0',
                height: `${String(height)}`,
              });
            }
          }}
        />
      </div>
    </>
  );
};

export default Size;
