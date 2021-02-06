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
        button-spinner(:disabled="isLoading", v-bind="{isLoading, status}") Войти
</template>


<script>
import defaultBtn from "../../components/button";
import appInput from "../../components/input";
import $axios from "../../axios.js";
import ButtonSpinner from "vue-button-spinner";
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
    ButtonSpinner,
    appInput,
  },
  data() {
    return {
      isLoading: false,
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
    }),
    async logon() {
      if ((await this.$validate()) === false) return;
      this.isLoading = true;
      try {
        const response = await $axios.post("/login", this.user);
        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          text: error.response.data.error,
          type: "error",
        });
        console.log(error.response.data.error);
        //....
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="postcss" scoped src="./login.pcss">
</style>