import Vue from "vue";
import $axios from "./axios";

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
  async created() {
    const response = await $axios.get("/categories/" + $axios.UserId);
    this.skills=response.data;
    // this.skills = require("../json/skills.json");
    // console.log(this.skills);
  },
});
