<template lang="pug">
  .wrap
    Pads(:sounds="sounds")
    .error(v-show="error") {{ errorMsg }}
    Handlers
</template>

<script lang="ts">
// import library
import axios from 'axios';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

// import component
import Pads from './pads/Pads.vue';
import Handlers from './handlers/Handlers.vue';
import Methods from '../methods/';

// vue
export default Vue.extend({
  components: {
    Pads,
    Handlers
  },
  created() {
    this.createAudioContext();
  },
  computed: {
    ...mapGetters({
      'error': 'getIsError',
      'errorMsg': 'getErrorMsg'
    })
  },
  methods: {
    ...mapActions({
      'createAudioContext': 'createAudioContext'
    })
  }
})
</script>

<style lang="sass">

</style>

