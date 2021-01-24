import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

new Vue({
  el: "#reviews-component",
  template: "#reviews-container",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    // var mql = window.matchMedia(" (max-width: 600px) ");
    return {
      reviews: [],
      sliderOptions: {
        slidesPerView: 2,
        loop: false
      }
    };
  },
  computed: {
    slider() {
      return this.$refs["slider"].$swiper;
    }
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
  mounted () {
    var mediaQueryList = window.matchMedia(" (max-width: 600px) ");
    mediaQueryList.addEventListener("change",(e) => {
      console.log(e.matches);
      this.sliderOptions.slidesPerView = e.matches ? 2 : 1;
      console.log(this.sliderOptions.slidesPerView);
    });
 }
});