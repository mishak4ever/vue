import Vue from "vue";
import $axios from "./axios";

const thumbs = {
  props: ["works", "currentWork", "direction"],
  template: "#works-thumbs",
  computed: {
    slicedSlides() {
      return [...this.works].slice(0, 3);
    },
  },
  methods: {
    enterCb(el, done) {
      if (this.works.length < 1) return;
      console.log("enter", this.direction);
      this.$emit("controlButton", {
        direction: this.direction,
        disabled: true,
      });
      const list = el.closest("ul");
      list.classList.add("transition");
      if (this.direction == "next") {
        el.classList.add("top-outsided");
        list.style.transform = "translateY(100px)";
      } else {
        el.classList.add("bottom-outsided");
        list.style.transform = "translateY(-100px)";
      }
      list.addEventListener("transitionend", (e) => done());
    },
    afterCb(el) {
      console.log("after");
      const list = el.closest("ul");
      if (this.direction == "next") {
        el.classList.remove("top-outsided");
      } else {
        el.classList.remove("bottom-outsided");
      }
      list.style.transform = "translateY(0px)";
      list.classList.remove("transition");
      this.$emit("controlButton", {
        direction: this.direction,
        disabled: false,
      });
    },
    leaveCb(el, done) {
      console.log("leave");
      el.classList.add("fade");
      el.addEventListener("transitionend", (e) => done());
    },
  },
};

const buttons = {
  props: ["notHoverUp", "notHoverDown", "disableNext", "disablePrev"],
  template: "#works-buttons",
};

const display = {
  props: [
    "currentWork1",
    "works",
    "currentIndex",
    "direction",
    "disableNext",
    "disablePrev",
  ],
  template: "#works-display",
  components: {
    thumbs,
    buttons,
  },
  computed: {
    reversedWorks() {
      const works = [...this.works];
      // return works.slice(0, 3).reverse();
      // return works.slice(0, 3);
      return works;
      // return works.reverse();
    },
    currentSlide() {
      return this.currentIndex + 1;
    },
    maxUp() {
      return this.currentIndex >= this.works.length - 1;
    },
    maxDown() {
      return this.currentIndex <= 0;
    },
  },
  methods: {},
};

const tags = {
  props: ["tags"],
  template: "#works-tags",
};

const info = {
  props: ["works", "currentWork"],
  template: "#works-info",
  components: {
    tags,
  },
  computed: {
    tagsArray() {
      return this.currentWork.techs.split(",");
    },
    worksArray() {
      return this.works.map((item) => {
        return item.id;
      });
    },
  },
};

new Vue({
  el: "#works-component",
  template: "#works-container",
  components: {
    display,
    info,
  },
  data() {
    return {
      works: [
        {
          description: "",
          id: "",
          link: "",
          photo: "",
          pic: "",
          techs: "",
          title: "",
        },
      ],
      currentIndex: 0,
      direction: "",
      disableNext: false,
      disablePrev: false,
    };
  },
  computed: {
    currentWork() {
      return this.works[0];
    },
  },
  watch: {
    currentIndex(value) {
      this.makeLoop(value);
    },
  },
  methods: {
    makeLoop(index) {
      const worksLength = this.works.length - 1;
      // if (index < 0) this.currentIndex = worksLength;
      // if (index > worksLength) this.currentIndex = 0;
      if (index < 0) this.currentIndex = 0;
      if (index > worksLength) this.currentIndex = worksLength;
    },
    requireImagesToArray(data) {
      console.log(data);
      return data.map((item) => {
        const requiredImage = require(`../images/content/${item.photo}`)
          .default;
        item.photo = requiredImage;
        return item;
      });
    },
    compslide(direction) {
      this.direction = direction;
      const lastItem = this.works[this.works.length - 1];
      const worksLength = this.works.length - 1;
      switch (direction) {
        case "prev":
          if (this.currentIndex == worksLength) break;
          this.works.push(this.works[0]);
          this.works.shift();
          this.currentIndex++;
          break;
        case "next":
          if (this.currentIndex == 0) break;
          this.works.unshift(lastItem);
          this.works.pop();
          this.currentIndex--;
          break;
      }
    },
    thslide(slide_id) {
      while (this.currentWork.id != slide_id) {
        this.works.push(this.works[0]);
        this.works.shift();
        this.currentIndex = this.currentWork.id - 1;
      }
    },
    controlButton(event) {
      switch (event.direction) {
        case "prev":
          this.disablePrev = event.disabled;
          break;
        case "next":
          this.disableNext = event.disabled;
          break;
      }
    },
    setFullUrlImages(data) {
      return data.map((item) => {
        item.pic = `${$axios.defaults.baseURL}/${item.photo}`;
        console.log(item.pic);
        return item;
      });
    },
  },
  async created() {
    const response = await $axios.get("/works/" + $axios.UserId);
    console.log(response.data);
    this.works = this.setFullUrlImages(response.data);
    // const worksData = require("../json/works.json");
    // this.works = this.requireImagesToArray(worksData);
    this.currentWork = this.works[this.currentIndex];
  },
});
