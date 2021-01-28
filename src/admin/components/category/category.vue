<template lang="pug">
.category-component
  card
    editLine(
      slot="title",
      v-model="title",
      editModeByDefault

    )
</template>

<script>
import card from "../card";
import editLine from "../editLine";
export default {
components:{
  card,
  editLine
},
data(){
  return {
    title:"",
  }
}
};
</script>

<style lang="postcss" scoped src="./category.pcss"></style>