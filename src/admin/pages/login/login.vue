<template lang="pug">
.login-component
  .content
    form.login-form(@submit.prevent="logon")
      .login-form-title Авторизация
      .login
        app-input(
          placeholder="Логин",
          :errorMessage="validation.firstError('user.login')",
          v-model="user.login",
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
        defaultBtn(type="default")
</template>


<script>
import defaultBtn from "../../components/button";
import appInput from "../../components/input";

// import { Validator, mixin as validatorMixin } from "simple-vue-validator";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

export default {
  // mixins: [validatorMixin],
  validators: {
    "user.login": (value) => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": (value) => {
      return Validator.value(value).required("Пароль не может быть пустым");
    },
  },
  components: {
    defaultBtn,
    appInput,
  },
  data() {
    return {
      titleError: "",
      passError: "",
      user: {
        login: "",
        password: "",
      },
    };
  },

  methods: {
    logon() {
      this.$validate().then((isValid) => {
        if (!isValid) return;
        console.log(this.user);
      });
    },
  },
};
</script>

<style lang="postcss" scoped src="./login.pcss">
</style>