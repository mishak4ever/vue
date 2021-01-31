import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

new Vue({
  props: ["slideCount"],
  el: "#reviews-component",
  template: "#reviews-container",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      reviews: [],
      sliderOptions: {
        slidesPerView: 2,
        loop: false,
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 40
          }
        }
      },
    };
  },
  computed: {
    slider() {
      return this.$refs["slider"].$swiper;
    },
  },
  methods: {
    requireImagesToArray(data) {
      return data.map((item) => {
        item.pic = require(`../images/content/${item.pic}`).default;
        return item;
      });
    },
    slide(direction) {
      switch (direction) {
        case "next":
          this.slider.slideNext();
          break;
        case "prev":
          this.slider.slidePrev();
          break;
      }
    },
  },
  created() {
    const data = require("../json/reviews.json");
    this.reviews = this.requireImagesToArray(data);
  },
});
