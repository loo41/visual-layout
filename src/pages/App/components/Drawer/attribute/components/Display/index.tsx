import { Select } from 'antd';
import Flex from './flex';
import styles from './index.module.scss';
import { CssProps } from '../../config';

const { Option } = Select;

const KEY = 'display';
const Display: React.FC<CssProps> = ({ style = [], onChange }) => {
  const display = style.filter(css => css.key === KEY)[0];

  return (
    <div className={styles.container}>
      <h4 style={{ width: 50 }}>展示</h4>
      <div>
        <Select
          style={{ width: 150 }}
          value={display?.value || ''}
          onChange={value => {
            onChange?.([
              {
                key: KEY,
                value,
              },
              ...style.filter(css => css.key !== KEY),
            ]);
          }}
        >
          <Option value="flex">flex</Option>
          <Option value="block">block</Option>
          <Option value="inline">inline</Option>
          <Option value="inline-block">inline-block</Option>
          <Option value="inline-flex">inline-flex</Option>
        </Select>
      </div>
      {['flex', 'inline-flex'].includes(display?.value) && (
        <Flex style={style} onChange={onChange} />
      )}
    </div>
  );
};

export default Display;
