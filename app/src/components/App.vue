<template lang="pug">
  .wrap
    Pads(:sounds="sounds" :getAudioBuffer="getAudioBuffer" :playSound="playSound")
    .error(v-show="error") {{ errorMsg }}
</template>

<script lang="ts">
// import library
import axios from 'axios';
import Vue from 'vue';

// import component
import Pads from './pads/Pads.vue';

declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

// vue
export default Vue.extend({
  data: function() {
    return {
      sounds: [
        {
          source: 'sounds/bassdrum1.mp3'
        },
        {
          source: 'sounds/bassdrum2.mp3'
        },
        {
          source: 'sounds/cymbal.mp3'
        },
        {
          source: 'sounds/cymbal2.mp3'
        },
        {
          source: 'sounds/tom1.mp3'
        },
        {
          source: 'sounds/tom2.mp3'
        }
      ],
      audioContext: <any>{},
      error: true,
      errorMsg: <string>'',
      effector: {
        distortion: {
          connect: false,
          level: 0
        }
      }
    }
  },
  components: {
    Pads
  },
  created() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.audioContext.createBufferSource().start(0);
    } catch(e) {
      this.error = true;
      this.errorMsg = e;
    }

  },
  methods: {
    getAudioBuffer(uri: string, cb: (buffer: AudioBuffer) => AudioBuffer):object {
      return axios(uri, { responseType: 'arraybuffer' })
        .then(({data}) => {
          return this.audioContext.decodeAudioData(data, (buffer: AudioBuffer) => {
            cb(buffer);
          });
        });
    },

    playSound(buffer: AudioBuffer):void {
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      this.useDistortion(source).connect(this.audioContext.destination);
      source.start(0);
    },

    useDistortion(source: AudioNode):AudioNode {
      if (this.effector.distortion.connect) {
        const distortion = this.audioContext.createWaveShaper();
        source.connect(distortion);
        distortion.connect(this.audioContext.destination);

        // 配列のサイズだけどあまり影響ないのでとりあえず4096
        const NUM_SAMPLES: number = 4096;
        distortion.curve = this.createCurveForDistortion(
          this.effector.distortion.level,
          NUM_SAMPLES
        );

        return distortion;
      } else {
        return source;
      }

    },


    /**
    * https://stackoverflow.com/questions/7840347/web-audio-api-waveshapernode
    * @param {number} amount 0 < amout < 1 distortion level
    * @param {number} numberOfSample size of Float32Array
    * @return {Float32Array|null} curver property
    */
    createCurveForDistortion(amount: number, numberOfSample: number): Float32Array | null {
      if (amount > 0 && amount <1) {
        const curves = new Float32Array(numberOfSample);
        const k = (2 * amount) / (1 - amount);
        for (let i = 0; i < numberOfSample; i++) {
          // LINEAR INTERPOLATION: x := (c - a) * (z - y) / (b - a) + y
          // a = 0, b = 2048, z = 1, y = -1, c = i
          const x = (((i - 0) * (1 - (-1))) / (numberOfSample - 0)) + (-1);
          curves[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
        }
        return curves;
      } else {
        return null; // default value
      }
    }
  }
})
</script>

<style lang="sass">

</style>

