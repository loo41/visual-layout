import { LayoutComponent, History, Component } from './slider-components';
import {
  HistoryOutlined,
  LayoutOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';

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
      title: '常见布局',
      component: <LayoutComponent />,
    },
    {
      id: 'history',
      icon: <HistoryOutlined style={{ fontSize: 24 }} />,
      title: '历史记录',
      component: <History />,
    },
    {
      id: 'component',
      icon: <AppstoreOutlined style={{ fontSize: 24 }} />,
      title: '组件',
      component: <Component />,
    },
  ];
};

export { getSiderMenu };
