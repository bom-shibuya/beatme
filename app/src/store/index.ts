import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

const state = {
  audioContext: <AudioContext | null>null,
  error: false,
  sounds: [
    { source: 'sounds/bassdrum1.mp3' },
    { source: 'sounds/bassdrum2.mp3' },
    { source: 'sounds/cymbal.mp3' },
    { source: 'sounds/cymbal2.mp3' },
    { source: 'sounds/tom1.mp3' },
    { source: 'sounds/tom2.mp3' }
  ],
  effector: {
    distortion: {
      connect: false,
      level: 0
    }
  }
};

interface SetEffectLevel {
  key: string;
  value: number;
}

interface SetEffectConnect {
  key: string;
  isConnect: boolean;
}

const mutations = {
  setAudioContext (state: any, audioContext: AudioContext):void {
    state.audioContext = audioContext;
  },
  setError (state: any, isError: boolean): void {
    state.error = isError;
  },
  setEffectLevel(state: any, payload: SetEffectLevel) {
    state.effector[payload.key].level = payload.value;
  },
  setEffectConnect(state: any, payload: SetEffectConnect) {
    state.effector[payload.key].connect = payload.isConnect;
  }
};

const actions = {
  createAudioContext({ commit, state, rootState }):void {
    window.AudioContext =
    window.AudioContext || window.webkitAudioContext;
    if (window.AudioContext) {
      commit('setAudioContext', new AudioContext());
    } else {
      commit('setError', true);
    }
  }
};
const store = {
  state,
  mutations,
  actions
};


export default new Vuex.Store(store);
