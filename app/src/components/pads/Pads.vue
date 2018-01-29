<template lang="pug">
  ul.pads
    li(v-for="sound in sounds")
      Pad(:sound="sound")
</template>

<script lang="ts">
import Vue from 'vue';
import Pad from './Pad.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  components: {
    Pad
  },
  computed: {
    ...mapGetters('Sounds', {
      'sounds': 'getSounds'
    })
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
