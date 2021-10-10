import { ProjectService } from 'src/controller';
import styles from './index.module.scss';

const BaseInfo: React.FC<{ project: ProjectService }> = ({ project }) => {
  const { name, description } = project;
  return (
    <div className={styles.warper}>
      <div className={styles.mainTitle}>
        <h3>项目信息</h3>
      </div>
      <div className={styles.body}>
        <div className={styles.item}>
          <div className={styles.title}>项目名: </div>
          <div className={styles.content}>{name ? name : '--'}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>项目描述: </div>
          <div className={styles.content}>{description ? description : '--'}</div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
