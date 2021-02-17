<template lang="pug">
.navigation-component
  .navigation-contant
    .content-container
      ul.list
        li.item(v-for="link in links", :key="link.id")
          router-link.link(:to="link.alias") {{ link.title }}
          //- a.link(:href="`${link.alias}`") {{ link.title }}
</template>

<script>
var links = [
  { id: 0, title: "Обо мне", alias: "about" },
  { id: 1, title: "Работы", alias: "works" },
  { id: 2, title: "Отзывы", alias: "reviews" },
];

export default {
  data() {
    return {
      links,
    };
  },
};
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>