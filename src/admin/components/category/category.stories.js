import category from "./category.vue";

export default {
  title: "category",
  components: { category },
};

export const defaultView = () => ({
  components: { category },
  template: `
    <category /> 
  `
});

defaultView.story = {
  name: "Стандартный вид"
}
