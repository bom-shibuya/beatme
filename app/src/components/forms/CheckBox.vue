<template lang="pug">
  input(
    type="checkbox"
    @change="updateValue($event.target.checked)")
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    updateValue(value: boolean):void {
      this.$emit('change', value);
      this.$emit('input', value);
    }
  }
});

</script>

<style lang="sass" scoped>
input[type=checkbox]
  width: 1.6rem
  height: 1.6rem
  background-color: blue
  &:checked
    background-color: red
</style>
