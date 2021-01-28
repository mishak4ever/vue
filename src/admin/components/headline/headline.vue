<template lang="pug">
.headline-component
  .container.headline-container
    slot
    .title {{ title }}
    .btns
      button.btn(type="button", @click="$emit('action', 'logout')") Выйти
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: "Панель администрирования",
    },
  },
};
</script>
<style lang="postcss" scoped src="./headline.pcss"></style>