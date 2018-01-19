<template lang="pug">
  ul.pads
    li(v-for="sound in sounds")
      Pad(:sound="sound" :getAudioBuffer="getAudioBuffer" :playSound="playSound")
</template>

<script lang="ts">
import Vue from 'vue';
import Pad from './Pad.vue';

export default Vue.extend({
  props: {
    sounds: Array,
    getAudioBuffer: Function,
    playSound: Function
  },
  components: {
    Pad
  }
})
</script>

<style lang="sass" scoped>
  .pads
    display: flex
    flex-flow: row wrap
    li
      margin: 1rem
</style>
