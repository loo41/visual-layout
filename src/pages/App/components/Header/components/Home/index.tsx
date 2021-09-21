import { FolderAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, Drawer, Row } from 'antd';
import { useContext } from 'react';
import { AppContext } from 'src/context';
import { ProjectObject } from 'src/model';
import Visible from 'src/pages/components/Visible';
import Project from '../Project';
import styles from './index.module.scss';

const Home: React.FC<{}> = () => {
  const { appService } = useContext(AppContext);

  const projects: ProjectObject[] = [];
  appService.projects.forEach(project => projects.unshift(project));

  return (
    <Visible>
      {({ visible, setVisible }) => (
        <>
          <Drawer
            title="项目 Home"
            placement="top"
            height={'calc(100% - 40px)'}
            mask={false}
            onClose={() => setVisible(false)}
            visible={visible}
          >
            <Row gutter={[20, 20]}>
              <Col className={styles.newBuild} span={4}>
                <div
                  onClick={() => {
                    appService.new();
                    setVisible(false);
                  }}
                >
                  <span>
                    <PlusCircleOutlined />
                  </span>
                  <span>新建项目</span>
                </div>
              </Col>
              {projects.map(project => (
                <Col className={styles.projects} span={4} key={project.id}>
                  <Project
                    project={project}
                    appService={appService}
                    setVisible={setVisible}
                  />
                </Col>
              ))}
            </Row>
          </Drawer>
          <div
            onClick={() => setVisible(!visible)}
            style={{ height: '100%', width: '100%', padding: '5px 10px' }}
          >
            项目
            <FolderAddOutlined
              style={{ color: 'white', fontSize: 16, marginLeft: 5 }}
            />
          </div>
        </>
      )}
    </Visible>
  );
};

export default Home;
