import styles from '../index.module.scss';
import { Button, Popconfirm } from 'antd';
import { PagesService } from 'src/controller';
import Operation from './Operation';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Options } from 'src/pages/App/components/Content/index';
import { openNewBuildModal } from './new-build';

const Header: React.FC<{
  pagesService: PagesService;
  options: Options;
  setOptions: (options: Options) => void;
}> = ({ pagesService, options, setOptions }) => {
  return (
    <div className={styles.header}>
      <div className={styles.pagesWarper}>
        <div className={styles.pages}>
          {Object.values(pagesService.getPages()).map(({ name, id }) => {
            const style = {
              border: `1px solid ${
                id === pagesService.currentId ? 'rgb(145, 213, 255)' : ''
              }`,
            };
            return (
              <div key={id} className={styles.page} style={style}>
                <span onClick={() => pagesService.setPages(id)}>{name}</span>
                <Popconfirm
                  title="确定删除?"
                  onConfirm={() => pagesService.delete(id)}
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
                pagesService,
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
          pagesService={pagesService}
        />
      </div>
    </div>
  );
};

export default Header;