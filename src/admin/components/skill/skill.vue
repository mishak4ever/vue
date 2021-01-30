<template lang="pug">
.skill-component(v-if="editMode == false")
  .title {{ skill.title }}
  .percent {{ skill.percent }}
  .btns
    icon.btn(symbol="pencil", @click="editMode = true", grayscale)
    icon.btn(symbol="trash", @click="$emit('remove', skill.id)", grayscale)
.skill-component(v-else)
  app-input.title(
    noSidePaddings,
    v-model="currentSkill.title",
    :errorMessage="titleError"
  )
  app-input.percent(
    type="number",
    :errorMessage="valError",
    min="0",
    max="100",
    maxlength="3",
    v-model="currentSkill.percent"
  )
  .btns
    icon.btn(symbol="tick", @click="editSkill()")
    icon.btn(symbol="cross", @click="editMode = false")
</template>

<script>
import appInput from "../input";
import icon from "../icon";
export default {
  components: {
    icon,
    appInput,
  },
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
      titleError: "",
      valError: "",
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
      },
    };
  },
  methods: {
    editSkill() {
      this.titleError =
        this.currentSkill.title == "" ? "Поле пустое" : "";
      this.valError =
        this.currentSkill.percent == "" ? "Поле пустое" : "";
      if (this.titleError != "" || this.valError != "") return;
      this.editMode = false;
      this.$emit("approve", this.currentSkill);
    },
  },
};
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>