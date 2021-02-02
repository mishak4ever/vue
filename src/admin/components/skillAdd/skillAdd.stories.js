import skillAdd from "./skillAdd.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onClick: action("onClick")
}

export default {
  title: "skillAdd",
  components: { skillAdd },
};

export const defaultView = () => ({
  components: { skillAdd },
  template: `
    <skillAdd @addskill="onClick" />
  `,
  methods,
});

defaultView.story = {
  name: "Стандартный вид",
};
