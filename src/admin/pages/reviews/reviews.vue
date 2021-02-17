<template lang="pug">
.works-component
  .page-content(v-if="true")
    .content-container
      .header
        .title Мои Отзывы
      .form
        transition(name="slide")
          reviewForm(
            v-if="showEmptyCat",
            :editReview="editReview",
            @close="handleClose",
            @submit="handleSubmit"
          )
      ul.cards
        li.item-card
          squareBtn(
            type="square",
            title="Добавить отзыв",
            @click="showEmptyCat = true"
          )
        li.item-card(v-for="review in reviews", :key="review.id")
          reviewCard(
            :review="review",
            @change="handleChange(review)",
            @delete="handleDelete(review)"
          )
  .page-content(v-else) Загрузка...
</template>

<script>
// import reviewForm from "../../components/reviewForm";
import reviewsModule from "../../store/modules/reviews";
import reviewCard from "../../components/reviewCard";
import squareBtn from "../../components/button";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    reviewForm: () => import("../../components/reviewForm"),
    reviewCard,
    squareBtn,
  },
  data() {
    return {
      showEmptyCat: false,
      editReview: {},
    };
  },
  computed: {
    ...mapState({
      reviews: (state) => state.reviews.data,
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch",
      deleteReview: "reviews/delete",
      getUser: "user/get_user",
    }),
    handleChange(review) {
      this.editReview = review;
      this.showEmptyCat = true;
    },
    handleDelete(review) {
      if (confirm("Вы действительно хотие удалить отзыв?")) {
        this.deleteReview(review);
      }
    },
    async handleSubmit() {
      await this.fetchReviews(this.user.user.id);
      this.editReview = {};
      this.showEmptyCat = false;
    },
    handleClose() {
      this.editReview = {};
      this.showEmptyCat = false;
    },
  },
  async created() {
    this.$store.registerModule("reviews", reviewsModule);
    this.getUser()
      .then((user) => {
        this.fetchReviews(user.id);
      })
      .catch((error) => {
        // console.log(error);
      });
  },
  destroyed() {
    this.$store.unregisterModule("reviews");
  },
  mounted() {
    // this.reviews = require("../../../json/reviews.json");
  },
};
</script>

<style lang="postcss" scoped src="./reviews.pcss">
</style>