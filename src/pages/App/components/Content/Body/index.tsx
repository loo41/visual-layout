import { AppService, PageService } from 'src/controller';
import styles from './index.module.scss';
import Container from './container';
import { Options } from '..';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const Body: React.FC<{ appService: AppService; options: Options }> = ({
  appService,
  options,
}) => {
  const [pages, setPages] = useState<PageService[]>([]);
  const project = useRef(appService.project);

  const curPage = appService.project.getCurrentPage();

  useEffect(() => {
    if (appService.project === project.current) {
      if (curPage && pages.every(({ id }) => id !== curPage.id)) {
        setPages(pages.concat([curPage]));
      }
    } else {
      project.current = appService.project;
      setPages([curPage]);
    }
    // eslint-disable-next-line
  }, [curPage, appService.project]);

  return (
    <div className={styles.body}>
      {pages.map(page => {
        const style = { display: page.id === curPage.id ? 'block' : 'none' };
        return (
          <div key={page.id} style={style} className={styles.innerBody}>
            <Container page={page} options={options} curPage={curPage} />
          </div>
        );
      })}
    </div>
  );
};

export default Body;
