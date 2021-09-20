import { PageService, ProjectService } from 'src/controller';
import styles from './index.module.scss';
import Container from './container';
import { Options } from '..';
import { useState } from 'react';
import { useEffect } from 'react';

const Body: React.FC<{ projectService: ProjectService; options: Options }> = ({
  projectService,
  options,
}) => {
  const [pages, setPages] = useState<PageService[]>([]);

  const curPage = projectService.getCurrentPage();

  useEffect(() => {
    if (curPage && pages.every(({ id }) => id !== curPage.id)) {
      setPages(pages.concat([curPage]));
    }
    // eslint-disable-next-line
  }, [curPage]);

  return (
    <div className={styles.body}>
      {pages.map(page => {
        const style = { display: page.id === curPage.id ? 'block' : 'none' };
        return (
          <div key={page.id} style={style}>
            <Container page={page} options={options} curPage={curPage} />
          </div>
        );
      })}
    </div>
  );
};

export default Body;
