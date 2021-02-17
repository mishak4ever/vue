<template lang="pug">
.login-component
  .content
    form.login-form(@submit.prevent="logon")
      .login-form-title Авторизация
      .login
        app-input(
          placeholder="Логин",
          :errorMessage="validation.firstError('user.name')",
          v-model="user.name",
          icon="user"
        )
      .pass
        app-input(
          placeholder="Пароль",
          :errorMessage="validation.firstError('user.password')",
          v-model="user.password",
          icon="key",
          type="password"
        )
      .button
        defaultBtn(type="spin", title="Отправить", :disabled="isLoading")
</template>


<script>
import defaultBtn from "../../components/button";
import appInput from "../../components/input";
// import $axios from "../../axios.js";
import { mapActions, mapState } from "vuex";

import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

export default {
  validators: {
    "user.name": (value) => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": (value) => {
      return Validator.value(value).required("Пароль не может быть пустым");
    },
  },
  components: {
    appInput,
    defaultBtn,
  },
  data() {
    return {
      isLoading: false,
      spinned: true,
      status: "",
      user: {
        name: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions({
      showTooltip: "tooltips/show_tooltip",
      userLogin: "user/login",
    }),
    async logon() {
      if ((await this.$validate()) === false) return;
      this.isLoading = true;
      try {
        const token = await this.userLogin(this.user);
        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="postcss" scoped src="./login.pcss">
</style>