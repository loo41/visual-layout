import { Layout } from 'antd';
import Content from './components/Content';
import Header from './components/Header';
import Sider from './components/Sider';
import Drawer from './components/Drawer';
import { PagesProvider } from 'src/context';

function App() {
  return (
    <PagesProvider>
      <Layout style={{ height: 'calc(100vh - 40px)' }}>
        <Layout>
          <Sider />
          <Content />
          <Drawer />
        </Layout>
      </Layout>
      <Header></Header>
    </PagesProvider>
  );
}

export default App;
