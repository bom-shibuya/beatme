<template lang="pug">
  input(
    type="range"
    :value="value"
    @input="updateValue($event.target.value)"
    :min="min"
    :max="max"
    :step="step")
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: Number,
    max: Number,
    min: Number,
    step: Number
  },
  methods: {
    updateValue(value: number) {
      this.$emit('input', value * 1);
    }
  }
})
</script>

<style lang="sass" scoped>
input[type="range"]
  background-color: white
  height: 5px
  width: 100%
  border-radius: 6px
  box-shadow: 0 0 5px rgba(0, 0, 0, .2)

  &:focus,
  &:active
    outline: none


  &::-webkit-slider-thumb
    cursor: pointer
    position: relative
    border: 2px solid rgba(0, 0, 0, .7)
    width: 22px
    height: 22px
    display: block
    background-color: red
    border-radius: 50%
    -webkit-border-radius: 50%

  &:active::-webkit-slider-thumb
    box-shadow: 0 0 0 4px rgba(255, 255, 255, .6)
    transition: .4s
</style>
