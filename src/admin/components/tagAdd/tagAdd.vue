<template lang="pug">
.tagAdd-component
  app-input(
    title="Добавление Тэга",
    maxlength="100",
    v-model="currentTags",
    @input="$emit('change', currentTags)"
  )
  ul.tags
    li.tag(
      v-for="(tag, index) in tagsArray",
      :key="`${tag}-${index}`",
      v-if="tag.trim()"
    )
      tag(interactive, :title="tag", @click="removeTag(tag)")
</template>

<script>
import appInput from "../input";
import tag from "../tag";
export default {
  components: {
    tag,
    appInput,
  },
  props: {
    tags: {
      type: String,
      default: " ",
    },
  },
  model: {
    prop: "tags",
    event: "change",
  },
  data() {
    return {
      currentTags: this.tags,
    };
  },
  computed: {
    tagsArray() {
      return this.currentTags.split(",").map((item) => {
        return item.trim();
      });
    },
  },
  methods: {
    removeTag(tag) {
      const tags = [...this.tagsArray];
      const tagInd = tags.indexOf(tag);
      if (tagInd < 0) return;

      tags.splice(tagInd, 1);
      this.currentTags = tags.join(", ");
      this.$emit("change", this.currentTags);
    },
  },
};
</script>

<style lang="postcss" scoped src="./tagAdd.pcss"></style>