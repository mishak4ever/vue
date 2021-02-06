<template lang="pug">
.skillAdd-component(:class="{ blocked: blocked }")
  .title
    app-input(
      placeholder="Новый навык",
      :errorMessage="validation.firstError('skill.title')",
      v-model="skill.title"
    )
  .percent
    app-input(
      type="number",
      min="0",
      max="100",
      maxlength="3",
      :errorMessage="validation.firstError('skill.percent')",
      v-model="skill.percent"
    )
  .button
    roundBtn(type="round", @click="addskill")
</template>

<script>
import appInput from "../input";
import roundBtn from "../button";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

export default {
  validators: {
    "skill.title": (value) => {
      return Validator.value(value).required("Введите название скила");
    },
    "skill.percent": (value) => {
      return Validator.value(value)
      .required("Пароль не может быть пустым")
      .integer("Введите число")
      .between(0,100,"Некорректное значение");
    },
  },
  components: {
    roundBtn,
    appInput,
  },
  props: {
    blocked: Boolean,
  },
  data() {
    return {
      skill: {
        title: "",
        percent: "",
      },
      titleError: "",
      valError: "",
    };
  },
  methods: {
    async addskill() {
       if ((await this.$validate()) === false) return;
      // this.titleError = this.skill.title == "" ? "Поле пустое" : "";
      // this.valError = this.skill.percent == "" ? "Поле пустое" : "";
      // if (this.titleError != "" || this.valError != "") return;
      this.$emit("addskill", {
        title: this.skill.title,
        percent: this.skill.percent,
      });
      this.skill.title = "";
      this.skill.percent = "";
    },
  },
};
</script>

<style lang="postcss" scoped src="./skillAdd.pcss"></style>