// import library
import Vue from 'vue';
import Vuex, { Store, ActionContext, Getter } from 'vuex';

// import store modules
import Sounds from './modules/Sounds';
import Effectors from './modules/Effectors';

// declare types
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

// start vuex!!
Vue.use(Vuex);


// root state
const state = {
  audioContext: <AudioContext | null>null,
  error: {
    is: false,
    msg: <string>''
  }
};


// root mutations
const mutations = {
  setAudioContext (state: any, audioContext: AudioContext):void {
    state.audioContext = audioContext;
  },
  setError (state: any, error: { is: boolean, msg: string }):void {
    state.error.is = error.is;
    state.error.msg = error.msg;
  }
};


// root getters
const getIsError: Getter<any, {}> = (state, getters):boolean => state.error.is;
const getErrorMsg: Getter<any, {}> = (state, getters):string => state.error.msg;

const getters = {
  getIsError,
  getErrorMsg
};


// root acctions
const actions = {
  createAudioContext ({ commit, state, rootState }:ActionContext<{}, {}>):void {
    window.AudioContext =
    window.AudioContext || window.webkitAudioContext;
    if (window.AudioContext) {
      commit('setAudioContext', new AudioContext());
    } else {
      commit('setError', {
        is: true,
        msg: 'The browser of the errand is not supported'
      });
    }
  }
};


// export stores
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    Sounds,
    Effectors
  }
});
