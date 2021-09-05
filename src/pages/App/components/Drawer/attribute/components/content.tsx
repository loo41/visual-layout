import { Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { PageService } from 'src/controller';
import styles from '../index.module.scss';

const Content: React.FC<{ page: PageService }> = ({ page }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (page) {
      setValue(page.currentNode[0]?.content || '');
    }
    // eslint-disable-next-line
  }, [page?.currentNode, page?.currentNode[0]?.content]);

  const updateClass = () => {
    if (value !== page.currentNode[0]?.content) {
      page.setContent(value);
    }
  };

  return (
    <div className={styles.container}>
      <Input.TextArea
        placeholder="文本内容"
        onChange={e => setValue(e.target.value)}
        value={value}
        onBlur={() => updateClass()}
      />
    </div>
  );
};

export default Content;
