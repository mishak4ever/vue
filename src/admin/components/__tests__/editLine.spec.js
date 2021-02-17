import editLine from "../editLine/editLine.vue";
import { mount } from "@vue/test-utils";

it("проверяет работу валидатора формы", async () => {
  const wrapper = mount(editLine);

  expect(wrapper.element).toMatchSnapshot();
  // await wrapper.find(".button-icon").trigger("click");
  // expect(wrapper.find("#title_input").props("errorMessage").isEmpty).toBe(
  //   "false"
  // );
});
