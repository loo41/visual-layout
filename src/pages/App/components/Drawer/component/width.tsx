import { Input, Select } from 'antd';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { CssProps } from '../config';

const { Option } = Select;

const KEY = 'width';
const Width: React.FC<CssProps> = ({ style = [], onChange }) => {
  const [option, setOption] = useState('px');
  const [value, setValue] = useState('');
  const unitValue = useRef<{ [props: string]: string }>();

  const width = style.filter(css => css.key === KEY)[0];

  useEffect(() => {
    const [, pixel, unit] =
      width?.value.trim().match(/^([0-9]*)(%|px|rem|em)/) || [];
    setOption(unit || 'px');
    setValue(pixel || '');
    unitValue.current = {
      [unit]: pixel,
    };
  }, [style]);

  const setStyle = () => {
    if (width.value !== `${value}${option}`) {
      onChange?.([
        ...style.filter(css => css.key !== KEY),
        {
          key: KEY,
          value: `${value}${option}`,
        },
      ]);
    }
  };

  return (
    <div>
      <Input
        addonAfter={
          <Select
            defaultValue="px"
            value={option}
            onChange={unit => {
              setOption(unit);
              setValue(
                ['rem', 'custom', 'vw'].includes(unit)
                  ? '暂不支持'
                  : unitValue.current?.[unit] || '',
              );
            }}
          >
            <Option value="px">px</Option>
            <Option value="rem">rem</Option>
            <Option value="vw">vw</Option>
            <Option value="%">%</Option>
            <Option value="custom">自定义</Option>
          </Select>
        }
        disabled={['rem', 'custom', 'vw'].includes(option)}
        onBlur={() => setStyle()}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default Width;
