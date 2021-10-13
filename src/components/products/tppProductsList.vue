<template>
  <div class="product-list-wrapper">
    <template v-if="!(productsList?.length)">
      <div class="image-not-found">
        <img src="@/assets/not_found.png" alt="not found">
      </div>
      <h2>Sorry? but we not have product <br>(by your query)</h2>
    </template>
    <template v-else>
      <section class="products">
          <tpp-product-item :productCurrent="product" v-for="product of productsList" :key="product._id"/>
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import IProduct from '@/models/IProduct'
import tppProductItem from '@/components/products/tppProductItem.vue';

export default defineComponent({
  name: 'ProductsList',
  components: {
    tppProductItem
  },
  data () {
    return {
    }
  },
  props: {
    productsList: {
      type: Object as PropType<Array<IProduct>>
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.image-not-found {
  max-width: 400px;
  margin: 0 auto;
}
h2 {
  font-size: 2rem;
  text-align: center;
  margin-top: 1rem;
  font-weight: 700;
}
</style>
