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
