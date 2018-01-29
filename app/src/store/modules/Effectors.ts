const state = {
  distortion: {
    connect: true,
    level: 0.9
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
  setEffectLevel (state: any, payload: SetEffectLevel) {
    state.effectors[payload.key].level = payload.value;
  },
  setEffectConnect (state: any, payload: SetEffectConnect) {
    state.effectors[payload.key].connect = payload.isConnect;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
