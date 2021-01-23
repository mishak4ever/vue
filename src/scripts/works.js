import Vue from "vue";

const thumbs = {
  props: ["works","currentWork"],
  template: "#works-thumbs",
};

const buttons = {
  template: "#works-buttons",
};

const display = {
  props: ["currentWork1","works"],
  template: "#works-display",
  components: {
    thumbs,
    buttons,
  },
};

const tags = {
  template: "#works-tags",
};

const info = {
  props: ["works","currentWork"],
  template: "#works-info",
  components: {
    tags,
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
      works: [],
      currentWork,
    };
  },
  methods: {
    requireImagesToArray(data) {
      console.log(data);
      return data.map((item) => {
        const requiredImage = require(`../images/content/${item.photo}`).default;
        item.photo = requiredImage;
        return item;
      });
    },
  },
  created() {
    const worksData = require("../json/works.json");
    this.works = this.requireImagesToArray(worksData);
    this.currentWork=this.works[1];
  },
});
