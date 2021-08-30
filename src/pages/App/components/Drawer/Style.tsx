import { Collapse, Input } from 'antd';
import { useState } from 'react';
import { PageService } from 'src/controller';
import { Css } from './config';
import _ from 'lodash';
import { Style } from 'src/model';

const { Panel } = Collapse;

const StyleComponent: React.FC<{ page: PageService }> = ({ page }) => {
  const [value, setValue] = useState('');

  const onChange = (styles: Style[]) => {
    page.setStyles(styles);
  };

  return (
    <div>
      <Input
        placeholder="CSS 属性过滤"
        onChange={e => setValue(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Collapse defaultActiveKey={[Css[0].key]} onChange={() => {}}>
        {Css.filter(
          ({ key }) => !value || new RegExp(_.escapeRegExp(value), 'ig').test(key),
        ).map(({ key, title, component }) => {
          return (
            <Panel header={title} key={key}>
              {component({
                style: page?.currentNode[0]?.styles,
                onChange,
              })}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default StyleComponent;
