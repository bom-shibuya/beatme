import Vuex, { Store, Getter } from 'vuex';

const state = {
  sounds: [
    { source: 'sounds/bassdrum1.mp3' },
    { source: 'sounds/bassdrum2.mp3' },
    { source: 'sounds/cymbal.mp3' },
    { source: 'sounds/cymbal2.mp3' },
    { source: 'sounds/tom1.mp3' },
    { source: 'sounds/tom2.mp3' }
  ]
};


// getters
const getSounds: Getter<any, {}> = (state, getters, rootState) => state.sounds;
const getters = {
  getSounds
};

export default {
  namespaced: true,
  getters,
  state
};
