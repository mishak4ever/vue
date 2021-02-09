<template>
  <div class="edit-line-component" :class="{ blocked: blocked }">
    <div class="title" v-if="category.editmode === false">
      <div class="text">{{ value }}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="category.editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorMessage="validation.firstError('value')"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="onCancel"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

export default {
  validators: {
    value: (value) => {
      return Validator.value(value).required("Введите название категории");
    },
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    blocked: Boolean,
    editModeByDefault: Boolean,
  },
  data() {
    return {
      category: {
        editmode: this.editModeByDefault,
        title: this.value,
      }
    };
  },
  methods: {
    async onApprove() {
      if ((await this.$validate()) === false) return;
      this.category.title = this.value;
      this.$emit("approve", this.category);
    },
    onCancel() {
      // this.category.editmode = false;
      this.$emit("remove",this.category);
    },
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input"),
  },
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>