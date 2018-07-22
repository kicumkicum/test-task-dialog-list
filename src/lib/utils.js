export const throttle = (callback, time) => {
  let lastCallTime = 0;

  return (...args) => {
    const now = Date.now();
    if (now - lastCallTime < time) {
      return;
    }

    callback(...args);
    lastCallTime = now;
  };
};

export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
