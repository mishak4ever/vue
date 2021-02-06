<template lang="pug">
.category-component
  card
    editLine(
      slot="title",
      v-model="catTitle",
      :editModeByDefault="empty",
      @remove="$emit('remove', $event)"
      @approve="$emit('approve', $event)"
    )
    .category-content(slot="content")
      ul.skills(v-if="empty == false")
        li.item(v-for="skill of skills", :key="skill.id")
          skill(
            :skill="skill",
            @remove="$emit('catEvent', { type: 'removeSkill', data: $event })",
            @approve="$emit('catEvent', { type: 'editSkill', data: $event })"
          )
      .add-skill
        skillAdd(
          :blocked="empty",
          @addskill="$emit('catEvent', { type: 'addSkill', data: $event })"
        )
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAdd from "../skillAdd";

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
      default: () => [],
    },
  },
  data() {
    return {
      catTitle: this.title,
    };
  },
};
</script>

<style lang="postcss" scoped src="./category.pcss"></style>