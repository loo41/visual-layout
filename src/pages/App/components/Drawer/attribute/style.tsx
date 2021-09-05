import { Input } from 'antd';
import { useState } from 'react';
import { PageService } from 'src/controller';
import { Css } from './config';
import _ from 'lodash';
import Collapse from 'src/pages/components/Collapse';
import { Style } from 'src/model';
import styles from './index.module.scss';

const StyleComponent: React.FC<{ page: PageService }> = ({ page }) => {
  const [value, setValue] = useState('');

  const onChange = (styles: Style[]) => {
    page.setStyles(styles);
  };

  return (
    <Collapse
      header={
        <div className={styles.header}>
          <span>样式</span>
          <Input
            placeholder="筛选"
            onChange={e => setValue(e.target.value)}
            style={{ width: 100 }}
          />
        </div>
      }
    >
      <>
        {Css.filter(
          ({ key }) => !value || new RegExp(_.escapeRegExp(value), 'ig').test(key),
        ).map(({ component }) => {
          return component({
            style: page?.currentNode[0]?.styles,
            onChange,
          });
        })}
      </>
    </Collapse>
  );
};

export default StyleComponent;
