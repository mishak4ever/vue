<template lang="pug">
.works-component
  .page-content(v-if="true")
    .content-container
      .header
        .title Мои Работы
      .form
        workForm(
          v-if="showEmptyCat",
          :editWork="editWork",
          @cancel="showEmptyCat = false"
        )
      ul.cards
        li.item
          squareBtn(
            type="square",
            title="Добавить работу",
            @click="showEmptyCat = true"
          )
        li.item(v-for="work in works", :key="work.id")
          workCard(:work="work", @change="handleChange(work)")
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
      getUser: "user/get_user",
    }),
    handleChange(work) {
      this.editWork=work;
      this.showEmptyCat=true;
      // console.log(work);
    },
  },
  created() {
    this.getUser()
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