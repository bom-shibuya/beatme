const state = {
  distortion: {
    connect: false,
    level: 0.9
  }
};

interface SetEffectLevel {
  key: string;
  prop: string;
  value: number;
}

interface SetEffectConnect {
  key: string;
  isConnect: boolean;
}

const mutations = {
  setEffectLevel (localState: any, payload: SetEffectLevel) {
    localState[payload.key][payload.prop] = payload.value;
  },
  setEffectConnect (localState: any, payload: SetEffectConnect) {
    localState[payload.key].connect = payload.isConnect;
  }
};


export default {
  namespaced: true,
  state,
  mutations
};
