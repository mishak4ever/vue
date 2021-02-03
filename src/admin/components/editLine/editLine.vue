<template>
  <div class="edit-line-component" :class="{ blocked: blocked }">
    <div class="title" v-if="editmode === false">
      <div class="text">{{ title }}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="title"
          :errorMessage="titleError"
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
          <icon symbol="cross" @click="onCancel()"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    blocked: Boolean,
    editModeByDefault: Boolean,
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      title: this.value,
      titleError: this.errorText,
    };
  },
  methods: {
    onApprove() {
      this.titleError = this.value.trim() == "" ? "Пустое поле" : "";
      if (this.titleError == "") {
        this.title = this.value;
        this.$emit("approve", this.value);
        this.editmode = false;
      }
    },
    onCancel() {
      this.editmode = false;
      this.titleError = ""
      this.$emit("remove");
    },
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input"),
  },
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>