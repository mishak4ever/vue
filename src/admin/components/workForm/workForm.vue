<template lang="pug">
.form-component
  form.form(@submit.prevent="handleSubmit", ref="form")
    workCard(title="Добавление работы")
      .form-container(slot="content")
        .form-cols
          .form-col
            label(
              :style="{ backgroundImage: `url(${newWork.preview})` }",
              :class="['uploader', { active: newWork.preview }, { hovered: hovered }]",
              @dragover="handleDragOver",
              @dragleave="hovered = false",
              @drop="handleChange"
            )
              .uploader-title Перетащите или загрузите картинку
              .uploader-btn
                defaultBtn(
                  typeAttr="file",
                  @change="handleChange",
                  title="Выбрать"
                )
          .form-col
            .form-row
              app-input(v-model="newWork.title", title="Название")
            .form-row
              app-input(v-model="newWork.link", title="Ссылка")
            .form-row
              app-input(
                v-model="newWork.description",
                field-type="textarea",
                title="Описание"
              )
            .form-row
              tagAdd(v-model="tech", :currentTags="tech", ref="tech")
        .form-btns
          .btn
            defaultBtn(title="Отмена", plain, @click="handleCancel")
          .btn
            defaultBtn(title="Сохранить")
</template>

<script>
import workCard from "../Card";
import defaultBtn from "../button";
import appInput from "../input";
import tagAdd from "../tagAdd";
import { mapActions } from "vuex";
export default {
  props: {
    editWork: {},
  },
  components: { workCard, defaultBtn, appInput, tagAdd },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      },
      tech: "",
      show: {},
    };
  },
  created() {
    this.newWork = this.editWork;
    this.newWork.id = this.editWork.id;
    this.newWork.preview = `https://webdev-api.loftschool.com/${this.newWork.photo}`;
    this.tech = this.editWork.techs;
    console.log(this.newWork);
  },
  methods: {
    ...mapActions({
      addNewWorkAction: "works/add",
      editWorkAction: "works/edit",
      showTooltip: "tooltips/show_tooltip",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      // this.$refs.form.submit();
      // console.log(this.$refs.tech.currentTags);
      this.newWork.techs = this.$refs.tech.currentTags;
      try {
        if (this.editWork.id) {
          await this.editWorkAction(this.newWork);
        } else {
          await this.addNewWorkAction(this.newWork);
        }
        this.showTooltip({
          text: this.editWork.id ? "Работа сохранена" : "Работа Добавлена",
          type: "success",
        });
        this.$emit("cancel");
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    handleCancel(event) {
      event.preventDefault();
      this.$emit("cancel");
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
        this.newWork.preview = reader.result;
        if ((file.size < 1, 5 * 1024 * 1024)) {
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
          this.newWork.preview = "";
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