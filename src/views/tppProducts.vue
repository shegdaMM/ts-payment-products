<template>
  <tpp-products-list :productsList="productList"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import tppProductsList from '@/components/products/tppProductsList.vue';

export default defineComponent({
  name: 'Products',
  components: {
    tppProductsList
  },
  computed: {
    ...mapGetters(['productList'])
  },
  methods: {
    ...mapActions(['getProductList'])
  },
  async created () {
   await this.getProductList();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
