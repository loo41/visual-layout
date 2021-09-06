import _ from 'lodash';

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

export { isObject, cloneDeep, getDoubleTime, formatTime };
