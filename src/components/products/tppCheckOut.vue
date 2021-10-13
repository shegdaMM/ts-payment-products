<template>
  {{$route.params.id}}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CheckOut',
  props: {
    msg: String,
  },
  data () {
    return {
      id: this.$route.params.id
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
