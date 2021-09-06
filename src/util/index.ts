import _ from 'lodash';
import { Component } from 'src/controller/react/container';
import { Pages } from 'src/model';
import { JSONComponent } from 'src/pages/App/components/Drawer/component-edit';

const isObject = (target: unknown) => {
  return Object.prototype.toString.call(target) === '[object Object]';
};

const cloneDeep = <T extends object>(object: T): T => _.cloneDeep(object);

const getDoubleTime = (time: number) => {
  return time > 9 ? time : `0${time}`;
};

const injectionName = (component: Component): JSONComponent => {
  return {
    name: component[Pages.COMPONENT_NAME],
    ...component,
    children:
      typeof component?.children === 'string'
        ? component?.children
        : component?.children?.map(child => injectionName(child)),
  };
};

const recoverySymbol = (component: JSONComponent): Component => {
  return {
    ...component,
    [Pages.COMPONENT_NAME]: component.name,
    children:
      typeof component?.children === 'string'
        ? component?.children
        : component?.children?.map(child => recoverySymbol(child)),
  };
};

export { isObject, cloneDeep, getDoubleTime, injectionName, recoverySymbol };
