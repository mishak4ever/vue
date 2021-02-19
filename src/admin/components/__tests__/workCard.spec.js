import workCard from "../workCard/workCard.vue";
import { mount } from "@vue/test-utils";

it("проверяет вывод элементов карточки работы", async () => {
  const wrapper = mount(workCard, {
    propsData: {
      work: {
        title: "title",
        photo: "qw",
        link: "qw",
        techs: "qw",
      },
    }
  });

  // expect(wrapper.element).toMatchSnapshot();

  expect(wrapper.find(".title").text()).toBe("title");
});
