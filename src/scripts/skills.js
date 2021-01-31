// console.log("this is the skills module");

import Vue from "vue";

const skillItem = {
  props: ["skill"],
  template: "#skills_item",
  mounted() {
    const circle = this.$refs["computed_circle"];
    const dashArray = parseInt(
      getComputedStyle(circle).getPropertyValue("stroke-dasharray")
    );
    const percent = (dashArray / 100) * (100 - this.skill.percent);
    circle.style.setProperty ('stroke-dashoffset',percent);
    console.log(percent);
  },
};

const skillRow = {
  props: ["category"],
  template: "#skills_row",
  components: {
    skillItem,
  },
};

new Vue({
  el: "#skills_component",
  template: "#skills_list",
  components: {
    skillRow,
  },
  data() {
    return {
      skills: [],
    };
  },
  created() {
    this.skills = require("../json/skills.json");
  },
});
