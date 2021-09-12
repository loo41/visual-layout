import { Input } from 'antd';
import { isString } from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import { PageService } from 'src/controller';
import styles from '../index.module.scss';

const Content: React.FC<{ page: PageService }> = ({ page }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (page) {
      const children = page.currentNode[0]?.children;
      const content = isString(children)
        ? children
        : isString(children?.[0])
        ? children?.[0] || ''
        : '';

      setValue(content);
    }
    // eslint-disable-next-line
  }, [page?.currentNode[0]]);

  const updateContent = () => {
    page.setContent(value);
  };

  return (
    <div className={styles.container}>
      <Input.TextArea
        placeholder="文本内容"
        onChange={e => setValue(e.target.value)}
        value={value}
        onBlur={() => updateContent()}
      />
    </div>
  );
};

export default Content;
