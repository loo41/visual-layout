import { PagesService } from 'src/controller';
import styles from './index.module.scss';
import Container from './container';
import { Options } from '..';

const Body: React.FC<{ pagesService: PagesService; options: Options }> = ({
  pagesService,
  options,
}) => {
  const page = pagesService.getCurrentPage();

  return (
    <div className={styles.body}>
      {page && <Container page={page} options={options} />}
    </div>
  );
};

export default Body;
