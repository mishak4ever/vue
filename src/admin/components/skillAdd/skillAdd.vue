<template lang="pug">
.skillAdd-component(:class="{ blocked: blocked }")
  .title
    app-input(
      placeholder="Новый навык",
      :errorMessage="titleError",
      v-model="skillTitle"
    )
  .percent
    app-input(
      type="number",
      min="0",
      max="100",
      maxlength="3",
      :errorMessage="valError",
      v-model="skillValue"
    )
  .button
    roundBtn(type="round", @click="addskill")
</template>

<script>
import appInput from "../input";
import roundBtn from "../button/types/roundBtn";
export default {
  components: {
    roundBtn,
    appInput,
  },
  props: {
    blocked: Boolean,
  },
  data() {
    return {
      skillTitle: "",
      skillValue: "",
      titleError: "",
      valError: "",
    };
  },
  methods: {
    addskill() {
      this.titleError =
        this.skillTitle == "" ? "Поле пустое" : "";
      this.valError = this.skillValue == "" ? "Поле пустое" : "";
      if (this.titleError != "" || this.valError != "") return;
      this.$emit("addskill", {
        title: this.skillTitle,
        percent: this.skillValue,
      });
      this.skillTitle = "";
      this.skillValue = "";
    },
  },
};
</script>

<style lang="postcss" scoped src="./skillAdd.pcss"></style>