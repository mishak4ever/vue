<template lang="pug">
.works-component
  .page-content(v-if="true")
    .content-container
      .header
        .title Мои Работы
      .form
        transition(name="slide")
          workForm(
            v-if="showEmptyCat",
            :editWork="editWork",
            @close="handleClose",
            @submit="handleSubmit"
          )
      ul.cards
        li.item-card
          squareBtn(
            type="square",
            title="Добавить работу",
            @click="showEmptyCat = true"
          )
        li.item-card(v-for="work in works", :key="work.id")
          workCard(
            :work="work",
            @change="handleChange(work)",
            @delete="handleDelete(work)"
          )
  .page-content(v-else) Загрузка...
</template>

<script>
import workForm from "../../components/workForm";
import workCard from "../../components/workCard";
import squareBtn from "../../components/button";
import { mapState, mapActions } from "vuex";
export default {
  components: { workForm, workCard, squareBtn },
  data() {
    return {
      showEmptyCat: false,
      editWork: {},
    };
  },
  computed: {
    ...mapState({
      works: (state) => state.works.data,
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions({
      fetchWorks: "works/fetch",
      deleteWork: "works/delete",
      getUser: "user/get_user",
    }),
    handleChange(work) {
      this.editWork = work;
      this.showEmptyCat = true;
      // console.log(work);
    },
    handleDelete(work) {
      if (confirm("Вы действительно хотие удалить работу?")) {
        this.deleteWork(work);
      }
    },
    async handleSubmit() {
      await this.fetchWorks(this.user.user.id);
      this.editWork = {};
      this.showEmptyCat = false;
    },
    handleClose() {
      this.editWork = {};
      this.showEmptyCat = false;
      // console.log(work);
    },
  },
  async created() {
    await this.getUser()
      .then((user) => {
        this.fetchWorks(user.id);
      })
      .catch((error) => {
        // console.log(error);
      });
  },
  mounted() {
    // this.fetchWorks(this.user.user.id);
  },
};
</script>

<style scoped lang="postcss" src="./works.pcss">
</style>