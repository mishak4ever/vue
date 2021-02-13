<template lang="pug">
.works-component
  .page-content(v-if="true")
    .content-container
      .header
        .title Мои Отзывы
      .form
        transition(name="slide")
          workForm(
            v-if="showEmptyCat",
            :editWork="editWork",
            @close="handleClose"
          )
      ul.cards
        li.item-card
          squareBtn(
            type="square",
            title="Добавить отзыв",
            @click="showEmptyCat = true"
          )
        li.item-card(v-for="review in reviews", :key="review.id")
          reviewCard(:review="review", @change="handleChange(work)")
  .page-content(v-else) Загрузка...
</template>

<script>
import workForm from "../../components/workForm";
import reviewCard from "../../components/reviewCard";
import squareBtn from "../../components/button";
import { mapState, mapActions } from "vuex";
export default {
  components: { workForm, reviewCard, squareBtn },
  data() {
    return {
      showEmptyCat: false,
      editWork: {},
      reviews: {},
    };
  },
  computed: {
    ...mapState({
      works: (state) => state.works.data,
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch",
      getUser: "user/get_user",
    }),
    handleChange(work) {
      this.editWork = work;
      this.showEmptyCat = true;
      // console.log(work);
    },
    handleClose() {
      this.editWork = {};
      this.showEmptyCat = false;
      // console.log(work);
    },
  },
  async created() {
    await this.getUser()
      .then((user) => {
        // this.fetchReviews(user.id);
      })
      .catch((error) => {
        // console.log(error);
      });
  },
  mounted() {
    this.reviews = require("../../../json/reviews.json");
  },
};
</script>

<style lang="postcss" scoped src="./reviews.pcss">
</style>