import { ArrowDownOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { AppService } from 'src/controller';
import { ProjectObject } from 'src/model';
import styles from './index.module.scss';

const Project: React.FC<{
  project: ProjectObject;
  appService: AppService;
  setVisible: (visible: boolean) => void;
}> = ({ project, appService, setVisible }) => {
  const operation = [
    {
      key: 'EditOutlined',
      icon: (
        <div
          className={styles.item}
          onClick={() => {
            appService.set(project.ID);
            setVisible(false);
          }}
        >
          <EditOutlined />
        </div>
      ),
    },
    {
      key: 'ArrowDownOutlined',
      icon: (
        <div className={styles.item}>
          <ArrowDownOutlined />
        </div>
      ),
    },
    {
      key: 'DeleteOutlined',
      icon: (
        <Popconfirm
          title="确定删除项目"
          onConfirm={() => appService.delete(project.ID)}
          onCancel={() => {}}
          okText="是"
          cancelText="否"
        >
          <div className={styles.item}>
            <DeleteOutlined style={{ color: 'red' }} />
          </div>
        </Popconfirm>
      ),
    },
  ];

  const isSelect = appService.project.ID === project.ID;

  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <span className={isSelect ? styles.select : ''} />
        {operation.map(({ key, icon }) => (
          <div key={key}>{icon}</div>
        ))}
      </div>
      <div className={styles.info}>
        <div>
          <span>项目名: </span>
          <span>{project.name ? project.name : '--'}</span>
        </div>
        <div>
          <span>项目描述: </span>
          <span>{project.description ? project.description : '--'}</span>
        </div>
      </div>
    </div>
  );
};

export default Project;
