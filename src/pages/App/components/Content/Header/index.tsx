import styles from '../index.module.scss';
import { Button, Popconfirm } from 'antd';
import { ProjectService } from 'src/controller';
import Operation from './Operation';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Options } from 'src/pages/App/components/Content/index';
import { openNewBuildModal } from './new-build';

const Header: React.FC<{
  projectService: ProjectService;
  options: Options;
  setOptions: (options: Options) => void;
}> = ({ projectService, options, setOptions }) => {
  return (
    <div className={styles.header}>
      <div className={styles.pagesWarper}>
        <div className={styles.pages}>
          {Object.values(projectService.getPages()).map(({ name, id }) => {
            const style = {
              border: `1px solid ${
                id === projectService.currentId ? '#1890ff' : ''
              }`,
            };
            return (
              <div key={id} className={styles.page} style={style}>
                <span onClick={() => projectService.setPages(id)}>{name}</span>
                <Popconfirm
                  title="确定删除?"
                  onConfirm={() => projectService.delete(id)}
                  onCancel={() => {}}
                  okText="是"
                  cancelText="否"
                >
                  <div className={styles.close}>
                    <CloseCircleOutlined />
                  </div>
                </Popconfirm>
              </div>
            );
          })}
        </div>
        <div className={styles.new}>
          <Button
            onClick={() => {
              openNewBuildModal({
                projectService,
              });
            }}
          >
            新建
          </Button>
        </div>
      </div>
      <div className={styles.opr}>
        <Operation
          options={options}
          setOptions={setOptions}
          projectService={projectService}
        />
      </div>
    </div>
  );
};

export default Header;
