<template lang="pug">
  .handlers
    Distortion
    Delay
</template>

 <script lang="ts">
 import Vue from 'vue';

 import Distortion from './Distortions.vue';
 import Delay from './Delay.vue';

 export default Vue.extend({
  components: {
    Distortion,
    Delay
  }
 })
 </script>
 
 <style lang="sass" scoped>
 
 </style>

