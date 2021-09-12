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

export type Children<T = AST> = T[] | string | null;

export type JSONComponent = Pick<
  AST,
  '_name' | 'styles' | 'className' | 'hasCanChild'
> & {
  children: Children<JSONComponent | string>;
  _type: 'Element' | 'Component';
} & Component;

export interface AST {
  _name: string;
  type: 'Element' | 'Component';
  children?: Children<AST | string>;
  styles?: Style[];
  element?: React.ReactElement;
  component?: Component;
  className?: string;
  hasCanChild?: boolean;
}

export type NodeOption = AST & {
  isRoot?: boolean;
  children?: Children<NodeService | string>;
  id?: number;
  content?: string;
};

export interface HistoryLog {
  id: number;
  time: Date;
  node: NodeService;
  description?: string;
}
