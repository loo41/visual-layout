import Pages from './pages';
import Page from './page';
import Node from './node';
import History from './history';
import { NodeService } from 'src/controller';
import React from 'react';
import { Component } from 'src/controller/react/container';

export { Pages, Page, Node, History };

export interface Style {
  key: string;
  value: string;
  title?: string;
}
export interface AST {
  [Pages.COMPONENT_NAME]: string;
  type: 'label' | symbol;
  children: AST[];
  styles?: Style[];
  element?: React.ReactElement;
  component?: Component;
  className?: string;
}

export interface HistoryLog {
  id: number;
  time: Date;
  node: NodeService;
  description?: string;
}
