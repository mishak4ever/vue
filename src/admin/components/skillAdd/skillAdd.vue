<template lang="pug">
.skillAdd-component(:class="{ blocked: blocked }")
  .title
    app-input(placeholder="Новый навык")
  .percent
    app-input(type="number", min="0", max="100", maxlength="3")
  .button
    roundBtn(type="round", @click="onClick")
</template>

<script>
import appInput from "../input";
import roundBtn from "../button";
export default {
  components: {
    roundBtn,
    appInput,
  },
  props: {
    blocked: Boolean,
  },
};
</script>

<style lang="postcss" scoped src="./skillAdd.pcss"></style>