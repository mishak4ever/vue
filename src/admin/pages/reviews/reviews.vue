<template lang="pug">
.reviews-component
  .admin-content(v-if="reviews.length")
    h1 Отзывы

  .loading-content(v-else) Загрузка...
</template>


<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      reviews: ["Категория1", "Категория2", "Категория3"],
      showEmptyCat: false,
    };
  },
  created() {},
  computed: {
    ...mapState({
      //....
    }),
  },
  methods: {
    ...mapActions({
      //...
    }),
  },
};
</script>

<style lang="postcss" scoped src="./reviews.pcss">
</style>