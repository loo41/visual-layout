import { Input, Select } from 'antd';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styles from '../index.module.scss';
import { CssProps } from '../config';

const { Option } = Select;

const KEY = 'width';
const Width: React.FC<CssProps> = ({ style = [], onChange }) => {
  const [option, setOption] = useState('px');
  const [value, setValue] = useState('');
  const unitValue = useRef<{ [props: string]: string }>();

  const width = style.filter(css => css.key === KEY)[0];

  useEffect(() => {
    const [, pixel, unit] = width?.value.trim().match(/^([0-9]*)(%|px)/) || [];
    setOption(unit || 'px');
    setValue(pixel || '');
    unitValue.current = {
      [unit]: pixel,
    };
    // eslint-disable-next-line
  }, [style]);

  const setStyle = () => {
    if (width?.value !== `${value}${option}`) {
      onChange?.([
        {
          key: KEY,
          value: `${value}${option}`,
        },
        ...style.filter(css => css.key !== KEY),
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <h4 style={{ width: 50 }}>宽度</h4>
      <Input
        style={{ width: 150 }}
        addonAfter={
          <Select
            defaultValue="px"
            value={option}
            onChange={unit => {
              setOption(unit);
              setValue(
                ['custom'].includes(unit)
                  ? '暂不支持'
                  : unitValue.current?.[unit] || '',
              );
            }}
          >
            <Option value="px">px</Option>
            <Option value="%">%</Option>
            <Option value="custom">自定义</Option>
          </Select>
        }
        disabled={['custom'].includes(option)}
        onBlur={() => setStyle()}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default Width;
