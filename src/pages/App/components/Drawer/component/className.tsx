import { Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { PageService } from 'src/controller';

const ClassName: React.FC<{ page: PageService }> = ({ page }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(page.currentNode[0]?.className || '');
  }, [page?.currentNode[0]?.className]);

  const updateClass = () => {
    if (value && value !== page.currentNode[0]?.className) {
      page.setClassName(value);
    }
  };

  return (
    <Input
      addonBefore="Class"
      onChange={e => setValue(e.target.value)}
      value={value}
      onBlur={() => updateClass()}
      style={{ marginBottom: 10 }}
    />
  );
};

export default ClassName;
