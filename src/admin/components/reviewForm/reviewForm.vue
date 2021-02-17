<template lang="pug">
.form-component
  form.form(@submit.prevent="handleSubmit", ref="form")
    reviewCard(:title="title")
      .form-container(slot="content")
        .form-cols
          .avatar-col
            div(
              :style="{ backgroundImage: `url(${preview})` }",
              :class="['avatar_wrapper', { no_photo: !preview }, { hovered: hovered }]",
              @dragover="handleDragOver",
              @dragleave="hovered = false",
              @drop="handleChange"
            )
            .uploader-btn-bottom
              defaultBtn(
                title="Добавить фото",
                plain,
                typeAttr="file",
                @change="handleChange"
              )
          .form-col
            .author-section
              .author-row
                app-input(
                  v-focus,
                  :errorMessage="validation.firstError('editReview.author')",
                  v-model="editReview.author",
                  title="Имя автора"
                )
              .author-row
                app-input(
                  v-model="editReview.occ",
                  :errorMessage="validation.firstError('editReview.occ')",
                  title="Титул автора"
                )
            .review-section
              .form-row
                app-input(
                  v-model="editReview.text",
                  :errorMessage="validation.firstError('editReview.text')",
                  field-type="textarea",
                  title="Описание"
                )
              .form-row
                .form-btns
                  .btn
                    defaultBtn(title="Отмена", plain, @click="handleCancel")
                  .btn
                    defaultBtn(
                      type="spin",
                      title="Сохранить",
                      :disabled="isSaving",
                      @submit.prevent="handleInput"
                    )
</template>

<script>
import reviewCard from "../Card";
import defaultBtn from "../button";
import appInput from "../input";
import tagAdd from "../tagAdd";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
import { mapState, mapActions } from "vuex";
export default {
  validators: {
    "editReview.author": (value) => {
      return Validator.value(value).required("Поле не может быть пустым");
    },
    "editReview.occ": (value) => {
      return Validator.value(value).required("Поле не может быть пустым");
    },
    "editReview.text": (value) => {
      return Validator.value(value).required("Поле не может быть пустым");
    },
  },
  props: {
    editReview: {},
  },
  components: { reviewCard, defaultBtn, appInput, tagAdd },
  data() {
    return {
      isSaving: false,
      hovered: false,
      title: "",
      preview: "",
      newReview: {
        author: "",
        occ: "",
        text: "",
        photo: {},
      },
      tech: "",
      show: {},
    };
  },
  created() {
    this.newReview = this.editReview;
    this.newReview.id = this.editReview.id;
    this.title = this.editReview.id
      ? "Редактирование отзыва"
      : "Добавление отзыва";
    if (this.editReview.photo)
      this.preview = `https://webdev-api.loftschool.com/${this.editReview.photo}`;
  },
  methods: {
    ...mapActions({
      addnewReviewAction: "reviews/add",
      editReviewAction: "reviews/edit",
      showTooltip: "tooltips/show_tooltip",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    handleInput(e) {
      e.preventDefault();
      console.log("handleInput", e);
    },
    async handleSubmit() {
      if ((await this.$validate()) === false) return;
      this.isSaving = true;
      let resp = "";
      try {
        if (this.editReview.id) {
          resp = await this.editReviewAction(this.newReview);
        } else {
          resp = await this.addnewReviewAction(this.newReview);
        }
        this.showTooltip({
          text: resp.message ? resp.message : "Запись изменена",
          type: "success",
        });
        this.$emit("submit");
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      } finally {
        this.isSaving = false;
      }
    },
    handleCancel(event) {
      event.preventDefault();
      if (event.clientX == 0 && event.clientY == 0) return;
      this.$emit("close");
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];
      this.newReview.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if ((file.size < 1, 5 * 1024 * 1024)) {
          this.preview = reader.result;
          this.showTooltip({
            text: `Файл загружен`,
            type: "success",
          });
        } else {
          this.showTooltip({
            text: `Файл больше 1,5 мб`,
            type: "error",
          });
          this.newReview.photo = {};
          this.preview = "";
        }
      };
      reader.onerror = () => {
        this.showTooltip({
          text: `Файл не загружен`,
          type: "error",
        });
      };
      reader.onabort = () => {
        this.showTooltip({
          text: `Файл не загружен`,
          type: "error",
        });
      };
    },
  },
};
</script>

<style src="./reviewForm.pcss" lang="postcss" scoped></style>