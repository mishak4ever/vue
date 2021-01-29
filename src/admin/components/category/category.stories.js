import category from "./category.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onRemove: action("onRemove"),
  onRemoveSkill: action("onRemoveSkill"),
  onEditSkill: action("onEditSkill"),
};
export default {
  title: "category",
  components: { category },
};

const skills = [
  {
    id: 0,
    title: "Html",
    percent: 80,
  },
  {
    id: 1,
    title: "Css",
    percent: 20,
  },
  {
    id: 2,
    title: "Javascript",
    percent: 50,
  },
];

export const defaultView = () => ({
  components: { category },
  data() {
    return {
      title: "Cat Title",
      skills,
    };
  },
  template: `
  <category 
   :title="title"
   :skills="skills"
   @remove="onRemove"
   @editSkill="onEditSkill"
   @removeSkill="onRemoveSkill"
  /> 
  `,
  methods,
});

defaultView.story = {
  name: "Стандартный вид",
};
