import { ProjectService } from 'src/controller';
import styles from './index.module.scss';
import Container from './container';
import { Options } from '..';

const Body: React.FC<{ projectService: ProjectService; options: Options }> = ({
  projectService,
  options,
}) => {
  const page = projectService.getCurrentPage();

  return (
    <div className={styles.body}>
      {page && <Container page={page} options={options} />}
    </div>
  );
};

export default Body;
