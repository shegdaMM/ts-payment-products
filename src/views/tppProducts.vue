<template>
  <tpp-products-list :productsList="productList"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import tppProductsList from '@/components/products/tppProductsList.vue';
import loadingState from '@/mixins/loadingState';

export default defineComponent({
  name: 'Products',
  mixins: [loadingState],
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
    this.onLoaderStatus();
    await this.getProductList();
  },
  mounted () {
     this.offLoaderStatus();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
