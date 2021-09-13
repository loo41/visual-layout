import _ from 'lodash';
import React from 'react';

const isObject = (target: unknown) => {
  return Object.prototype.toString.call(target) === '[object Object]';
};

const cloneDeep = <T extends object>(object: T): T => _.cloneDeep(object);

const getDoubleTime = (time: number) => {
  return time > 9 ? time : `0${time}`;
};

const formatTime = (time: Date = new Date()): string => {
  const Y = time.getFullYear();
  const M = time.getMonth() + 1;
  const D = time.getDate();
  const H = time.getHours();
  const Mi = getDoubleTime(time.getMinutes());
  const Se = getDoubleTime(time.getSeconds());

  return `${Y}/${M}/${D} ${H}:${Mi}:${Se}`;
};

function cloneJsxObject<T>(treeData: T): T {
  return _.cloneDeepWith(treeData, (value: T) => {
    if (React.isValidElement(value)) {
      return value;
    }
  });
}

const randomChart = (strLen: number = 5) => {
  const randoms: string[] = [];
  return () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const getRandom = () =>
      new Array(strLen)
        .fill(0)
        .map(() => str.charAt(Math.floor(Math.random() * str.length)))
        .join('');
    let random = getRandom();
    while (randoms.includes(random)) {
      random = getRandom();
    }
    randoms.push(random);
    return random;
  };
};

export {
  isObject,
  cloneDeep,
  getDoubleTime,
  formatTime,
  cloneJsxObject,
  randomChart,
};
