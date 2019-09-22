import {
  GET_SONGS_REQUEST,
  GET_SONGS_REQUEST_SUCCESS,
  GET_SONGS_REQUEST_ERROR,
} from '@/store/actions/utils';

import api from '@/utils/api';
import storage from '@/utils/storage';

const state = {
  status: '',
  songs: {},
};

/* eslint-disable no-shadow */
const getters = {
  getStatus: state => state.status,
  getSongs: state => state.songs,
};
/* eslint-enable no-shadow */

const actions = {
  [GET_SONGS_REQUEST]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(GET_SONGS_REQUEST);
      api.getSongs()
        .then((response) => {
          const songs = JSON.parse(response.data);
          commit(GET_SONGS_REQUEST_SUCCESS, songs);
          storage.setSongs(songs);
          resolve(response);
        })
        .catch((err) => {
          commit(GET_SONGS_REQUEST_ERROR);
          reject(err);
        });
    });
  },
};

/* eslint-disable no-shadow */
const mutations = {
  [GET_SONGS_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [GET_SONGS_REQUEST_SUCCESS]: (state, songs) => {
    state.status = 'success';
    state.songs = songs;
  },
  [GET_SONGS_REQUEST_ERROR]: (state) => {
    state.status = 'error';
  },
};
/* eslint-enable no-shadow */

export default {
  state,
  getters,
  actions,
  mutations,
};
