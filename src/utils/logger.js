export default class {
  constructor(name = '') {
    this.name = name;

    this.map = {
      critical: console.error,
      error: console.error,
      warning: console.warn,
      info: console.info,
      debug: console.log,
    };

    const self = this;
    /* eslint-disable func-names */
    Object.keys(this.map).forEach((level) => {
      self[level] = function (...rest) {
        self.log(level, ...rest);
      };
    });
  }

  log(level, ...rest) {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const args = [...rest];
    args.unshift(level.toUpperCase());
    args.unshift(`${this.name}:`);

    try {
      this.map[level].apply(console, args);
    } catch (e) {
      // empty
    }
  }
}
