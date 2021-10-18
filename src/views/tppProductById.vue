<template>
<div class="product-by-id">
    <tpp-product-item :productCurrent="productCurrent" />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import TppProductItem from '@/components/products/tppProductItem.vue';
import loadingState from '@/mixins/loadingState';


export default defineComponent({
  name: 'ProductById',
  mixins: [loadingState],
  components: {
    TppProductItem
  },
  computed: {
    ...mapGetters(['productCurrent'])
  },
  methods: {
    ...mapActions(['getProductCurrent'])
  },
  async created () {
    this.onLoaderStatus();
    await this.getProductCurrent();
  },
  mounted () {
     this.offLoaderStatus();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
