import { Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { PageService } from 'src/controller';
import styles from '../index.module.scss';

const ClassName: React.FC<{ page: PageService }> = ({ page }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (page) {
      setValue(page.currentNode[0]?.className || '');
    }
    // eslint-disable-next-line
  }, [page?.currentNode, page?.currentNode[0]?.className]);

  const updateClass = () => {
    if (value !== page.currentNode[0]?.className) {
      page.setClassName(value);
    }
  };

  return (
    <div className={styles.container}>
      <Input
        addonBefore="类名"
        onChange={e => setValue(e.target.value)}
        value={value}
        onBlur={() => updateClass()}
        placeholder={'类名，默认随机生成'}
      />
    </div>
  );
};

export default ClassName;
