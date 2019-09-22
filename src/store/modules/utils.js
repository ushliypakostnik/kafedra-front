import { TEST_ACTION } from '@/store/actions/utils';

const state = {
  test: '',
};

/* eslint-disable no-shadow */
const getters = {
  test: state => state.test,
};
/* eslint-enable no-shadow */

const actions = {
  [TEST_ACTION]: ({ commit }) => {
    commit(TEST_ACTION);
  },
};

/* eslint-disable no-shadow */
const mutations = {
  [TEST_ACTION]: (state) => {
    state.test = 'Normal flight!!!';
  },
};
/* eslint-enable no-shadow */

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
