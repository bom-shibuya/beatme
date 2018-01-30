<template lang="pug">
  .handler
    dl
      dt
        label
          CheckBox(v-model="connect")
          | distortion
      dd
        Range(v-model="level" :min="0" :max="0.99" :step="0.01")
        | range {{ level }}
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';

import Range from '../forms/Range.vue';
import CheckBox from '../forms/CheckBox.vue';

export default Vue.extend({
  computed: {
    connect: {
      get ():boolean {
        return this.$store.state.Effectors.distortion.connect;
      },
      set (value: boolean):void {
        this.setEffectConnect({
          key: 'distortion',
          isConnect: value
        });
      }
    },
    level: {
      get ():number {
        return this.$store.state.Effectors.distortion.level;
      },
      set (value: number):void {
        this.setEffectLevel({
          key: 'distortion',
          prop: 'level',
          value: value
        })
      }
    }
  },
  methods: {
    ...mapMutations('Effectors', {
      'setEffectConnect': 'setEffectConnect',
      'setEffectLevel': 'setEffectLevel'
    })
  },
  components: {
    Range,
    CheckBox
  }
})
</script>

<style lang="sass" scoped>


</style>
