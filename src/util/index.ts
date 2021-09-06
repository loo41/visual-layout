import _ from 'lodash';
import { Component } from 'src/controller/react/container';
import { JSONComponent } from 'src/controller/service/node';
import { Pages } from 'src/model';

const isObject = (target: unknown) => {
  return Object.prototype.toString.call(target) === '[object Object]';
};

const cloneDeep = <T extends object>(object: T): T => _.cloneDeep(object);

const getDoubleTime = (time: number) => {
  return time > 9 ? time : `0${time}`;
};

const recoverySymbol = (component: JSONComponent): Component => {
  return {
    ...component,
    [Pages.COMPONENT_NAME]: component._name,
    children:
      typeof component?.children === 'string'
        ? component?.children
        : component?.children?.map(child => recoverySymbol(child)),
  };
};

export { isObject, cloneDeep, getDoubleTime, recoverySymbol };
