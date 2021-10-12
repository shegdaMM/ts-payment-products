<template>
  <div class="home">
    {{name}}
    <button @click="changeName">
      edit Name
    </button>

    {{$store.getters.productList}}<br>
     {{$store.getters.productCount}}<br>
     {{$store.getters.notify}}<br>
     {{$store.getters.productCurrent}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  data () {
    return {
      name: '' as string,
      count: 0 as number
    };
  },
  components: {
  },
  methods: {
    changeName () {
      this.count = this.count + 1;
      this.name = `number =  ${this.count}`;
    }
  },
  mounted () {
    this.$store.dispatch('getProductList');
    this.$store.dispatch('getProductCurrent', 'tshirts0001');
  }
});
</script>
