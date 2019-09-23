<!-- eslint-disable max-len -->
<template>
  <div class="home">
    <div class="background background-0 hidden-xs hidden-sm"></div>
    <div id="background" class="background background-1 hidden-xs hidden-sm"></div>
    <div id="scene-1" class="scene-1 hidden-xs hidden-sm">
      <div data-depth="0.1" class="scene-1__1">
      </div>
      <div data-depth="0.4" originX="" class="scene-1__2">
        <h2><strong>{{ getStatus }} Kafedra</strong> of experimental psychonautics<span class="visible-lg-inline"> </span><br class="hidden-lg" />and inner space research</h2>
      </div>
      <div data-depth="0" originX="" class="scene-1__3">
        <div class="boom"><div class="pulse"><span>Radio! New!</span></div></div>
        <div class="arrow"><span class="bounce icon icon-down"></span></div>
      </div>
    </div>
    <div class="scene-1-gadgets visible-xs visible-sm">
      <h2><strong>Kafedra</strong> of experimental psychonautics<br />and inner space research</h2>
    </div>
    <div id="scene-2" class="scene-2">
      <div class="player-wrapper">
        <div class="player">
          <div class="player__now">
            <div class="player__label">Now</div>
            <div class="player__track-title">No Artist - No Title</div>
            <div class="player__duration">0:00</div>
          </div>
          <div class="player__next">
            <div class="player__label">Next</div>
            <div class="player__track-title">No Artist - No Title</div>
            <div class="player__duration">0:00</div>
          </div>
          <div class="player__btns">
            <a href="#" class="btn btn--play"><span class="btn__text">Play<i class="fas fa-play"></i></span></a
            ><a href="#" class="btn btn--pause"><span class="btn__text">Pause<i class="fas fa-pause"></i></span></a
            ><a href="#" class="btn btn--next"><span class="btn__text">Next<i class="fas fa-step-forward"></i></span></a>
          </div>
        </div>
        <div id="radio"></div>
      </div>
    </div>
    <footer class="footer home__footer" role="contentinfo">
      <address>
        <ul class="footer__links">
          <li>
            <a href="https://kafedra.bandcamp.com/" target="_blank">bandcamp</a>
          </li>
          <li>
            <a href="https://vk.com/kafedra_org" target="_blank">vkontakte</a>
          </li>
          <li>
             <a href="https://www.facebook.com/kafedra" target="_blank">facebook</a>
          </li>
          <li>
             <a href="https://www.instagram.com/kafedra_org/" target="_blank">instagram</a>
          </li>
        </ul>
        <div class="footer__copyright">© kafedra since 2007</div>
      </address>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Parallax from 'parallax-js';

import { SESSION_STORAGE } from '@/utils/constants';

import Radio from '@/utils/radio';

// import path from 'path'; // for logger
// import Logger from '@/utils/logger';
import ScreenHelper from '@/utils/_screen-helper';

// const logger = new Logger(path.basename(__filename, '.js'));

// import Loading from '@/components/Utils/Loading.vue';

const getHeight = () => {
  const scene = document.getElementById('scene-1');
  return Number(window.getComputedStyle(scene, null).getPropertyValue('height').slice(0, -2));
};

const checkScroll = (scroll) => {
  // logger.info('checkScroll');
  const background = document.getElementById('background');
  const radio = document.getElementById('radio');
  if (ScreenHelper.isDesktop()) {
    const top = -0.75 * (scroll - 10);
    background.style.top = `${top}px`;

    if (scroll > getHeight() - 300) {
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
  // logger.info('onscroll');
  const scroll = window.pageYOffset || document.documentElement.scrollTop;
  checkScroll(scroll);
  return scroll;
};

const redraw = () => {
  // logger.info('redraw');
  const radio = document.getElementById('radio');
  const height = getHeight();
  let h;
  if (ScreenHelper.isDesktop()) {
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

const controls = {
  playerClassName: 'player',
  btnPlay: '.btn--play',
  btnPause: '.btn--pause',
  btnNext: '.btn--next',
};

export default {
  name: 'Home',

  data: () => ({
    songs: JSON.parse(sessionStorage.getItem(SESSION_STORAGE.songs)) || null,
    radio: false,
  }),

  computed: {
    ...mapGetters({
      getStatus: 'getStatus',
      getSongs: 'getSongs',
    }),
  },

  mounted() {
    const scene = document.getElementById('scene-1');
    const parallaxInstance = new Parallax(scene); // eslint-disable-line no-unused-vars

    window.addEventListener('resize', () => redraw());
    window.addEventListener('scroll', () => onscroll());

    redraw();

    if (this.songs === null || typeof (this.songs) === 'undefined') {
      this.$store.dispatch('GET_SONGS_REQUEST');
    } else {
      const radio = new Radio({ // eslint-disable-line no-unused-vars
        songs: this.songs,
        ...controls,
      });
      this.radio = true;
    }
  },

  beforeUpdate() {
    if (this.getStatus === 'success' && !this.radio) {
      const radio = new Radio({ // eslint-disable-line no-unused-vars
        songs: this.getSongs,
        ...controls,
      });
      this.radio = true;
    }
  },
};
</script>
<!-- eslint-enable max-len -->
