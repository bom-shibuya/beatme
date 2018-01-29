
<template lang="pug">
  button(:class="{stillReady: !ready}" ref="padBtn")
</template>


<script lang="ts">
import Vue from 'vue';
import Methods from '../../methods/';

const supportTouch = 'ontouchend' in document;
const EVENT_NAME = supportTouch ? 'touchstart' : 'click';


export default Vue.extend({
  props: {
    sound: Object
  },
  data() {
    return {
      buffer: <any>null,
      ready: false
    }
  },
  mounted() {
    const padBtn = <HTMLElement>this.$refs.padBtn;
    const context = this.$store.state.audioContext;
    this.getAudioBuffer(context, this.sound.source, (buffer: AudioBuffer) => {
      this.buffer = buffer;
      this.ready = true;
      padBtn.addEventListener(EVENT_NAME, () => {
        const source = this.createSoundSource(context, this.buffer);
        source.connect(context.destination);
        source.start(0);
      });
    })
  },
  methods: {
    ...Methods
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

