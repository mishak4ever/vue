<template lang="pug">
.works-component
  .admin-content(v-if="works.length")
    h1 Работы

  .loading-content(v-else) Загрузка...
</template>


<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      works: ["Категория1", "Категория2", "Категория3"],
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

<style lang="postcss" scoped src="./works.pcss">
</style>