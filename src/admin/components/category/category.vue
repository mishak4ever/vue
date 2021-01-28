<template lang="pug">
.category-component
  card
    editLine(slot="title", v-model="title", editModeByDefault)
    .category-content(slot="content")
      ul.skills
        li.item(v-for="skill of skills", :key="skill.id")
          skill(:skill="skill")
      .add-skill
        skillAdd
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAdd from "../skillAdd";
const skills = [
  {
    id: 0,
    title: "Html",
    percent: 80,
  },
  {
    id: 1,
    title: "Css",
    percent: 20,
  },
  {
    id: 2,
    title: "Javascript",
    percent: 50,
  },
];

export default {
  components: {
    card,
    editLine,
    skill,
    skillAdd,
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: "",
    },
    skills: {
      type: Array,
      default: () => skills,
    },
  },
  data() {
    return {
      title: "",
    };
  },
};
</script>

<style lang="postcss" scoped src="./category.pcss"></style>