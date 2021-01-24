import Vue from "vue";

const thumbs = {
  props: ["works", "currentWork"],
  template: "#works-thumbs",
};

const buttons = {
  props: ["notHoverUp","notHoverDown"],
  template: "#works-buttons",
};

const display = {
  props: ["currentWork1", "works", "currentIndex"],
  template: "#works-display",
  components: {
    thumbs,
    buttons,
  },
  computed: {
    reversedWorks() {
      const works = [...this.works];
      return works.slice(0, 3).reverse();
    },
    currentSlide() {
      return this.currentIndex + 1;
    },
    maxUp() {
      return this.currentIndex >= this.works.length-1;
    },
    maxDown() {
      return this.currentIndex <= 0;
    },
  },
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
      return this.currentWork.skills.split(",");
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
      works: [],
      currentIndex: 0,
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
      const lastItem = this.works[this.works.length - 1];
      const worksLength = this.works.length - 1;
      switch (direction) {
        case "next":
          if (this.currentIndex == worksLength) break;
          this.works.push(this.works[0]);
          this.works.shift();
          this.currentIndex++;
          break;
        case "prev":
          if (this.currentIndex == 0) break;
          this.works.unshift(lastItem);
          this.works.pop();
          this.currentIndex--;
          break;
      }
    },
  },
  created() {
    const worksData = require("../json/works.json");
    this.works = this.requireImagesToArray(worksData);
    // this.currentWork = this.works[this.currentIndex];
  },
});
