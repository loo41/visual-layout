import { LayoutComponent, History, Component, NodeTree } from './slider-components';
import {
  HistoryOutlined,
  LayoutOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';

export interface Menu {
  icon: React.ReactNode;
  id: string;
  title: string;
  component: React.ReactNode;
}

const getSiderMenu = (): Menu[] => {
  return [
    {
      id: 'layout',
      icon: <LayoutOutlined style={{ fontSize: 24 }} />,
      title: '布局',
      component: <LayoutComponent />,
    },
    {
      id: 'component',
      icon: <AppstoreOutlined style={{ fontSize: 24 }} />,
      title: '组件',
      component: <Component />,
    },
    {
      id: 'node',
      icon: <ApartmentOutlined style={{ fontSize: 24 }} />,
      title: '节点树',
      component: <NodeTree />,
    },
    {
      id: 'history',
      icon: <HistoryOutlined style={{ fontSize: 24 }} />,
      title: '历史',
      component: <History />,
    },
  ];
};

export { getSiderMenu };
