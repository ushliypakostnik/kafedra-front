export const randomizeArray = (arr) => {
  const b = arr.slice(); // list copy
  return arr.map(() => {
    const rndIndex = Math.floor(Math.random() * b.length);
    return b.splice(rndIndex, 1)[0];
  });
};

export const addEventListener = (el, event, fn) => {
  if (el.addEventListener) {
    // W3C DOM
    el.addEventListener(event, fn, false);
  } else if (el.attachEvent) {
    // IE DOM
    el.attachEvent(`on${event}`, fn);
  } else {
    // No much to do
    // eslint-disable-next-line no-param-reassign
    el[`on${event}`] = fn;
  }

  // NB: returned function should remove event listener
  // eslint-disable-next-line func-names
  return () => {
    if (el.addEventListener) {
      // W3C DOM
      el.removeEventListener(event, fn, false);
    } else if (el.attachEvent) {
      // IE DOM
      el.detachEvent(`on${event}`, fn);
    } else {
      // No much to do
      // eslint-disable-next-line no-param-reassign
      delete el[`on${event}`];
    }
  };
};

export const addClassName = (el, className) => {
  // eslint-disable-next-line no-param-reassign
  el.className = `${el.className} ${className}`;
};

export const removeClassName = (el, className) => {
  // eslint-disable-next-line no-param-reassign
  el.className = el.className.replace(new RegExp(`(?:^|\\s)${className}(?:\\s|$)`), ' ');
};
