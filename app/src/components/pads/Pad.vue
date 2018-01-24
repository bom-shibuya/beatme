
<template lang="pug">
  button(:class="{stillReady: !ready}" ref="padBtn")
</template>


<script lang="ts">
import Vue from 'vue';

const supportTouch = 'ontouchend' in document;
const EVENT_NAME = supportTouch ? 'touchstart' : 'click';


export default Vue.extend({
  props: {
    sound: Object,
    getAudioBuffer: Function,
    playSound: Function
  },
  data() {
    return {
      buffer: <any>null,
      ready: false
    }
  },
  mounted() {
    const padBtn = <HTMLElement>this.$refs.padBtn;
    this.getAudioBuffer(this.sound.source, (buffer: AudioBuffer) => {
      this.buffer = buffer;
      this.ready = true;
      padBtn.addEventListener(EVENT_NAME, () => {
        this.playSound(this.buffer);
      });
    });
  }
})
</script>

<style lang="sass" scoped>
  button
    display: block
    height: 100px
    width: 100px
    border: 2px solid black
    &.stillReady
      background-color: grey
</style>

