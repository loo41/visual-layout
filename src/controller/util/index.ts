const randomStr = (strLen: number = 5) => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  return new Array(strLen)
    .fill(0)
    .map(() => str.charAt(Math.floor(Math.random() * str.length)))
    .join('');
};

export { randomStr };
