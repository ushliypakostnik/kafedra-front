import { Howl } from 'howler';

import {
  randomizeArray,
  addEventListener,
  addClassName,
  removeClassName,
} from './_helpers';

/* eslint no-underscore-dangle: 0 */
/* eslint no-multi-spaces: 0 */

class Radio {
  _songs = [];   // list of songs filled with json data

  _sound = null; // howler player instance

  _currentSongIndex = -1;

  _isNowPlaying = false;

  _isPlayerActive = false;

  static _getSongsList(songsUrl) {
    // eslint-disable-next-line no-undef
    return fetch(songsUrl)
      .then(response => response.json())
      .catch((err) => {
        console.error('something gone wrong with request', err);
      });
  }

  static _getFormattedTime(duration) {
    const sRaw = duration % 60;
    const s = Math.floor(sRaw);
    const m = (duration - sRaw) / 60;
    const h = (duration - m * 60 - sRaw) / 60 / 60;
    return `${h > 0 ? `${h}:` : ''}${m < 10 && h > 0 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  }

  constructor(initialOptions) {
    addEventListener(window, 'load', () => {
      this._initRadio(initialOptions);
    });
  }

  // https://eslint.org/docs/rules/class-methods-use-this
  // eslint-disable-next-line class-methods-use-this
  play(isToPlay) {
    if (this._sound) {
      this._isNowPlaying = isToPlay;
      if (isToPlay) {
        this._sound.play();
      } else {
        this._sound.pause();
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  next() {
    this._setNextTrack();
    this._updatePlayerState();

    const track = this._getTrackInfo();

    if (this._sound) {
      this._sound.unload();
    }

    if (!track) { return; }

    this._sound = new Howl({
      src: [track.url],
      autoplay: this._isNowPlaying,
      onend: () => {
        // console.log('Finished! Start next');
        this.next();
      },
    });
  }

  _updatePlayerState() {
    const track = this._getTrackInfo();
    const nextTrack = this._getTrackInfo(1);

    if (!track) { return; }

    this._updateTrackInfo({
      type: 'now',
      title: `${track.meta.artist[0]} - ${track.meta.title}`,
      duration: Radio._getFormattedTime(track.meta.duration),
    });

    if (!nextTrack) { return; }

    this._updateTrackInfo({
      type: 'next',
      title: `${nextTrack.meta.artist[0]} - ${nextTrack.meta.title}`,
      duration: Radio._getFormattedTime(nextTrack.meta.duration),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _updateTrackInfo({ type, title, duration }) {
    if (['now', 'next'].indexOf(type) >= 0) {
      const trackInfoContainer = document.querySelector(`.player__${type}`);
      const titleEl = trackInfoContainer.querySelector('.player__track-title');
      const durationEl = trackInfoContainer.querySelector('.player__duration');

      titleEl.innerHTML = title;
      durationEl.innerHTML = duration;
    }
  }

  _bindControls({
    playerClassName, btnPlay, btnPause, btnNext,
  }) {
    const playerContainer = document.querySelector(`.${playerClassName}`);
    const playBtn = `.${playerClassName} ${btnPlay}`;
    const pauseBtn = `.${playerClassName} ${btnPause}`;
    const nextBtn = `.${playerClassName} ${btnNext}`;

    addEventListener(document.querySelector(playBtn), 'click', (e) => {
      e.preventDefault();
      if (this._isPlayerActive) {
        addClassName(playerContainer, `${playerClassName}--active`);
        this.play(true);
      }
    });

    addEventListener(document.querySelector(pauseBtn), 'click', (e) => {
      e.preventDefault();
      if (this._isPlayerActive) {
        removeClassName(playerContainer, `${playerClassName}--active`);
        this.play(false);
      }
    });

    addEventListener(document.querySelector(nextBtn), 'click', (e) => {
      e.preventDefault();
      this.next();
    });
  }

  _initRadio({
    playerClassName, btnPlay, btnPause, btnNext, songsUrl,
  }) {
    this._bindControls({
      playerClassName,
      btnPlay,
      btnPause,
      btnNext,
    });

    Radio._getSongsList(songsUrl).then((result) => {
      if (result && result.songs && result.songs.length > 0) {
        this._isPlayerActive = true;
        this._songs = randomizeArray(result.songs);
        this.next(); // initial player data setup
      }
    });
  }

  _setNextTrack() {
    this._currentSongIndex = (this._currentSongIndex + 1) % this._songs.length;
  }

  _getTrackInfo(offset) {
    const add = typeof offset !== 'undefined' ? offset : 0;
    return this._songs[(this._currentSongIndex + add) % this._songs.length];
  }
}

export default Radio;
