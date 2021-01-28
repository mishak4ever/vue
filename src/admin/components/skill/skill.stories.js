import skill from "./skill.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onApprove: action("onApprove"),
  onRemove: action("onRemove")
}


export default {
  title: "skill",
  components: { skill },
};

export const defaultView = () => ({
  components: { skill },
  data() {
    return{
      skill:{
        id:0,
        title:"Тест",
        percent: 50,
      },
    };
  },
  template: `
    <skill :skill="skill" @approve="onApprove" @remove="onRemove" /> 
  `,
  methods,
});

defaultView.story = {
  name: "Стандартный вид",
};
