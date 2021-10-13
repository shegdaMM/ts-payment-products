<template>
  <div class="home">

    {{$store.getters.productList}}<br>
     {{$store.getters.productCount}}<br>
     {{$store.getters.notify}}<br>
     {{productCurrent}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
// import IProduct from '@/models/IProduct';

export default defineComponent({
  name: 'Home',
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters(['productCurrent'])
  },
  components: {
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('getProductList');
    this.$store.dispatch('getProductCurrent', 'tshirts0001');
  }
});
</script>
