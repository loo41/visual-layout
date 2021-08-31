import { Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { PageService } from 'src/controller';
import ClassName from './component/className';
import styles from './index.module.scss';

const Css: React.FC<{ page: PageService }> = ({ page }) => {
  const cssString =
    page?.currentNode[0]?.styles
      ?.map(({ key, value }) => {
        return `${key}: ${value};\n`;
      })
      .join('') || '';

  const [css, setCss] = useState(cssString);

  useEffect(() => {
    setCss(cssString);
  }, [cssString]);

  const setStyle = () => {
    if (css !== cssString) {
      const styles = css
        .replace(/\\n/, '')
        .split(';')
        .map(style => {
          const [key, value] = style.split(':').map(key => key.trim());
          return {
            key,
            value,
          };
        })
        .filter(({ key, value }) => key && value);
      page.setStyles(styles);
    }
  };

  return (
    <div>
      <ClassName page={page} />
      <Input.TextArea
        className={styles.input}
        value={css}
        rows={10}
        onChange={e => {
          setCss(e.target.value);
        }}
        onBlur={() => setStyle()}
      />
    </div>
  );
};

export default Css;
