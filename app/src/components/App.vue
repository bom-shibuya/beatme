<template lang="pug">
  .wrap
    Greeting(:greeting="greeting")
    Pads(:sounds="sounds" :getAudioBuffer="getAudioBuffer" :playSound="playSound")
    .error(v-show="error") {{ errorMsg }}
</template>

<script lang="ts">
// import library
import axios from 'axios';
import Vue from 'vue';

// import component
import Greeting from './Greeting.vue';
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
      greeting: 'HELLO! PEACE WORLD!!!',
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
      errorMsg: <string>''
    }
  },
  components: {
    Greeting,
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
    getAudioBuffer(uri: string, cb: (buffer: object) => void):object {
      return axios(uri, { responseType: 'arraybuffer' })
        .then(({data}) => {
          return this.audioContext.decodeAudioData(data, (buffer: object) => {
            cb(buffer);
          });
        });
    },

    playSound(buffer: string):void {
      const source = this.audioContext.createBufferSource();
      const filter = this.audioContext.createBiquadFilter();
      const filter2 = this.audioContext.createBiquadFilter();
      source.buffer = buffer;
      source.connect(filter);
      source.connect(filter2);
      filter2.type = 'highshelf';
      filter2.frequency.value = 100;
      filter2.connect(this.audioContext.destination);
      filter.type = 'lowpass';
      filter.frequency.value = 1000;
      filter.connect(this.audioContext.destination);
      source.start(0);
    }
  }
})
</script>

<style lang="sass">

</style>

