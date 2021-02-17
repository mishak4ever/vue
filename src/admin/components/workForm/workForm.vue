<template lang="pug">
.form-component
  form.form(@submit.prevent="handleSubmit", ref="form")
    workCard(:title="title")
      .form-container(slot="content")
        .form-cols
          .form-col
            label(
              :style="{ backgroundImage: `url(${preview})` }",
              :class="['uploader', { active: preview }, { hovered: hovered }]",
              @dragover="handleDragOver",
              @dragleave="hovered = false",
              @drop="handleChange"
            )
              .uploader-title(v-if="wideWindow") Перетащите или загрузите картинку
              .uploader-btn(v-if="wideWindow")
                defaultBtn(
                  typeAttr="file",
                  @change="handleChange",
                  title="Выбрать"
                )
              .uploader-btn-bottom(v-else)
                defaultBtn(
                  title="Изменить превью",
                  plain,
                  typeAttr="file",
                  @change="handleChange"
                )
          .form-col
            .form-row
              app-input(
                v-focus,
                v-model="newWork.title",
                :errorMessage="validation.firstError('newWork.title')",
                title="Название",
                id="title_input"
              )
            .form-row
              app-input(
                v-model="newWork.link",
                :errorMessage="validation.firstError('newWork.link')",
                title="Ссылка"
              )
            .form-row
              app-input(
                v-model="newWork.description",
                :errorMessage="validation.firstError('newWork.description')",
                field-type="textarea",
                title="Описание"
              )
            .form-row
              tagAdd(
                v-model="newWork.techs",
                :errorMessage="validation.firstError('newWork.techs')",
                :currentTags="tech",
                ref="tech"
              )
        .form-btns
          .btn
            defaultBtn(title="Отмена", plain, @click="handleCancel")
          .btn
            defaultBtn(type="spin" id="save_btn", title="Сохранить", :disabled="isSaving")
</template>

<script>
import workCard from "../Card";
import defaultBtn from "../button";
import appInput from "../input";
import tagAdd from "../tagAdd";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
import { mapState, mapActions } from "vuex";

export default {
  validators: {
    "newWork.title": (value) => {
      return Validator.value(value).required("Введите название работы");
    },
    "newWork.link": (value) => {
      return Validator.value(value)
        .required("Введите ссылку на работу")
        .url("Поле должно содержать URL");
    },
    "newWork.techs": (value) => {
      return Validator.value(value).required("Введите тэги");
    },
    "newWork.description": (value) => {
      return Validator.value(value).required("Введите описание");
    },
  },
  props: {
    editWork: {},
  },
  components: { workCard, defaultBtn, appInput, tagAdd },
  data() {
    return {
      isSaving: false,
      hovered: false,
      title: "",
      preview: "",
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
      },
      tech: "",
      show: {},
    };
  },
  created() {
    this.newWork = this.editWork;
    this.newWork.id = this.editWork.id;
    this.title = this.editWork.id
      ? "Редактирование работы"
      : "Добавление работы";
    if (this.editWork.photo)
      this.preview = `https://webdev-api.loftschool.com/${this.newWork.photo}`;
  },
  computed: {
    ...mapState({
      winWidth: (state) => state.window.windowWidth,
    }),
    wideWindow() {
      return this.winWidth > 768;
    },
  },
  methods: {
    ...mapActions({
      addNewWorkAction: "works/add",
      editWorkAction: "works/edit",
      showTooltip: "tooltips/show_tooltip",
    }),
    click() {
      console.log(this.windowWidth);
    },
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if ((await this.$validate()) === false) return;
      this.isSaving = true;
      let resp = "";
      try {
        if (this.editWork.id) {
          resp = await this.editWorkAction(this.newWork);
        } else {
          resp = await this.addNewWorkAction(this.newWork);
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
      this.$emit("close");
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];
      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if ((file.size < 1, 5 * 1024 * 1024)) {
          this.preview = reader.result;
          console.log(reader);
          this.showTooltip({
            text: `Файл загружен`,
            type: "success",
          });
        } else {
          this.showTooltip({
            text: `Файл больше 1,5 мб`,
            type: "error",
          });
          this.newWork.photo = {};
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

<style src="./workForm.pcss" lang="postcss" scoped></style>