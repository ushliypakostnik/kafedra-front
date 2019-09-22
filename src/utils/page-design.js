import path from 'path';
import Logger from './logger';
import ScreenHelper from './screen-helper';

const logger = new Logger(path.basename(__filename, '.js'));

const PageDesign = (() => {
  const NAME = 'PageDesign'; // eslint-disable-line no-unused-vars

  const scene1 = document.getElementById('scene-1');
  const background = document.getElementById('background');
  const radio = document.getElementById('radio');
  let height;

  const getHeight = (el) => {
    const h = Number(window.getComputedStyle(el, null).getPropertyValue('height').slice(0, -2));
    return h;
  };

  const checkScroll = (scroll) => {
    if (ScreenHelper.isDesktop()) {
      const top = -0.75 * (scroll - 10);
      background.style.top = `${top}px`;

      if (scroll > height - 300) {
        radio.classList.add('riseUp');
        radio.classList.remove('riseDown');
      } else {
        radio.classList.remove('riseUp');
        radio.classList.add('riseDown');
      }
    } else {
      radio.classList.remove('riseUp');
      radio.classList.remove('riseDown');
    }
  };

  const onscroll = () => {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;

    checkScroll(scroll);

    return scroll;
  };

  const redraw = () => {
    logger.info('redraw');

    if (ScreenHelper.isDesktop()) {
      height = getHeight(scene1);
      let h;
      if (height > 700) {
        h = (height - 60) * 0.6;
      } else {
        h = (height - 60) * 0.5;
      }
      radio.style.height = `${h}px`;
    } else {
      radio.style.height = '';
    }

    checkScroll(onscroll());
  };

  const init = () => {
    logger.info('init');

    window.addEventListener('resize', () => redraw());
    window.addEventListener('scroll', () => onscroll());

    redraw();
  };

  return {
    init,
    redraw,
    onscroll,
  };
})();

export default PageDesign;
