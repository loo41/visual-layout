import Project from './project';
import Page from './page';
import Node from './node';
import History from './history';
import App from './app';
import { NodeService } from 'src/controller';
import React from 'react';
import { Component } from 'src/controller/react/container';

export { Project, Page, Node, History, App };

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

export type HistoryObject = {
  history: (Omit<HistoryLog, 'node'> & {
    node: NodeObject;
  })[];
  future: (Omit<HistoryLog, 'node'> & {
    node: NodeObject;
  })[];
  id: number;
};

export type NodeObject = Omit<AST, 'children' | 'element'> & {
  children?: string | Children<NodeObject | string>;
  id: number;
  random: number;
  isRoot?: boolean;
  isDelete: boolean;
  isSelect: boolean;
};

export type ASTObject = Omit<AST, 'children' | 'element'> & {
  children?: Children<ASTObject | string>;
};

export type PageObject = Pick<Page, 'id' | 'name'> & {
  currentNode: NodeObject[];
  page: NodeObject;
  target: ASTObject;
  history: HistoryObject;
};

export type ProjectObject = Pick<
  Project,
  'ID' | 'currentId' | 'name' | 'description'
> & {
  pages: {
    [props: string]: PageObject;
  };
  idx: number;
};

export type NodeOption = AST & {
  isRoot?: boolean;
  children?: Children<NodeService | string>;
  id?: number;
  content?: string;
};

export interface HistoryLog {
  id: number;
  time: string;
  node: NodeService;
  description?: string;
}
