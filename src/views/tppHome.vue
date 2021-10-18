<template>
  <div class="home">
    {{$store.getters.loadProcess}} <br>

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
import loadingState from '@/mixins/loadingState';

export default defineComponent({
  name: 'Home',
  mixins: [loadingState],
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
  created () {
    this.onLoaderStatus();
  },
  mounted () {
    this.$store.dispatch('getProductList');
    this.$store.dispatch('getProductCurrent', 'tshirts0001');

    this.offLoaderStatus();
  }
});
</script>
