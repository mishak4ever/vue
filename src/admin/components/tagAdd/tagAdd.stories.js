import tagAdd from "./tagAdd.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onClick: action("onClick"),
};

export default {
  title: "tagAdd",
  components: { tagAdd },
};

export const defaultView = () => ({
  components: { tagAdd },
  data() {
    return {
      tags: "Один, Два, Три",
    };
  },
  template: `
    <tagAdd v-model="tags"/>
  `,
  methods,
});

defaultView.story = {
  name: "Стандартный вид",
};
