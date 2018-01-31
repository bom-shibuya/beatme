<template lang="pug">
  .handler
    dl
      dt
        label
          CheckBox(v-model="connect")
          | Delay
      dd
        Range(v-model="delayTime" :min="0" :max="1" :step="0.01")
        | delayTime {{ delayTime }}
      dd
        Range(v-model="dry" :min="0" :max="1" :step="0.01")
        | dry {{ dry }}
      dd
        Range(v-model="wet" :min="0" :max="1" :step="0.01")
        | wet {{ wet }}
      dd
        Range(v-model="feedback" :min="0" :max="0.9" :step="0.01")
        | feedback {{ feedback }}
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
        return this.$store.state.Effectors.delay.connect;
      },
      set (value: boolean):void {
        this.setEffectConnect({
          key: 'delay',
          isConnect: value
        });
      }
    },
    delayTime: {
      get ():number {
        return this.$store.state.Effectors.delay.delayTime;
      },
      set (value: number):void {
        this.setEffectLevel({
          key: 'delay',
          prop: 'delayTime',
          value: value
        })
      }
    },
    dry: {
      get ():number {
        return this.$store.state.Effectors.delay.dry;
      },
      set (value: number):void {
        this.setEffectLevel({
          key: 'delay',
          prop: 'dry',
          value: value
        })
      }
    },
    wet: {
      get ():number {
        return this.$store.state.Effectors.delay.wet;
      },
      set (value: number):void {
        this.setEffectLevel({
          key: 'delay',
          prop: 'wet',
          value: value
        })
      }
    },
    feedback: {
      get ():number {
        return this.$store.state.Effectors.delay.feedback;
      },
      set (value: number):void {
        this.setEffectLevel({
          key: 'delay',
          prop: 'feedback',
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
