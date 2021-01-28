import headline from "./headline.vue";
import {action} from "@storybook/addon-actions";

const methods={
  onAction: action("onAction")
};

export default {
  title: "headline",
  components: { headline },
};

export const defaultView = () => ({
  components: { headline },
  template: `
    <headline @action="onAction" title="Панель администрирования">
      <h4>Содержимое</h4>
    </headline>
  `,
  methods
});

defaultView.story = {
  name: "Стандартный вид"
}
