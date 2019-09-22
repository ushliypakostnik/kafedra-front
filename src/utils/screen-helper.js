// Модуль экранный помощник
const ScreenHelper = (() => {
  /* eslint-disable no-unused-vars */
  const NAME = 'ScreenHelper';

  const XS = 360;
  const SM = 768;
  const MD = 1100;
  const LG = 1600;

  const isXS = () => {
    return window.matchMedia(`(max-width: ${SM - 1}px)`).matches;
  }

  const isSM = () => {
    return window.matchMedia(`(min-width: ${SM}px) and (max-width: ${MD - 1}px)`).matches;
  }

  const isMD = () => {
    return window.matchMedia(`(min-width: ${MD}px) and (max-width: ${LG - 1}px)`).matches;
  }

  const isDesktop = () => {
    return window.matchMedia(`(min-width: ${MD}px)`).matches;
  }

  const isLG = () => {
    return window.matchMedia(`(min-width: ${LG}px)`).matches;
  }

  return {
    isXS,
    isSM,
    isMD,
    isLG,
    isDesktop,
  };
})();

export default ScreenHelper;
