<template>
  <div class="site-wrapper">
    <tpp-header />
    <main class="main">
      <router-view/>
    </main>
  </div>
  <tpp-loader />
  <tpp-notify />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import tppHeader from './components/tppHeader.vue';
import tppLoader from './components/ui/tppLoader.vue';
import tppNotify from './components/ui/tppNotify.vue';

export default defineComponent({
  name: 'app',
  components: {
    tppHeader, tppLoader, tppNotify
  }
})
</script>

<style lang="scss">
  body {
    background-color: rgba(1, 111, 255, 0.455);
    background-image:url("data:image/svg+xml;charset=utf8,%3Csvg id='Layer_1' fill-opacity='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' style='enable-background:new 0 0 500 500'%3E%3Cstyle%3E .st0{fill:rgba(255, 255, 255, 0.23)} %3C/style%3E%3Ccircle class='st0' cx='87.5' cy='46.5' r='8.5'/%3E%3Ccircle class='st0' cx='94.5' cy='124.5' r='15.5'/%3E%3Ccircle class='st0' cx='244.5' cy='91.5' r='21.5'/%3E%3Ccircle class='st0' cx='348.5' cy='80.5' r='7.5'/%3E%3Ccircle class='st0' cx='155' cy='356' r='10'/%3E%3Ccircle class='st0' cx='422' cy='139' r='14'/%3E%3Ccircle class='st0' cx='123' cy='251' r='6'/%3E%3Ccircle class='st0' cx='280' cy='204' r='11'/%3E%3Ccircle class='st0' cx='315' cy='311' r='11'/%3E%3Ccircle class='st0' cx='262' cy='411' r='6'/%3E%3Ccircle class='st0' cx='455.5' cy='395.5' r='12.5'/%3E%3Ccircle class='st0' cx='432' cy='500' r='25'/%3E%3Ccircle class='st0' cx='432' r='25'/%3E%3Ccircle class='st0' cx='-3.5' cy='240.5' r='10.5'/%3E%3Ccircle class='st0' cx='496.5' cy='240.5' r='10.5'/%3E%3Ccircle class='st0' cx='96' cy='437' r='3'/%3E%3C/svg%3E");
  }
  .site-wrapper {
    padding: 0 0;
    width: 100%;
    max-width: 1400px;
    min-width: 300px;
    margin: 0 auto;
    min-height: 100vh;

    position: relative;
  }
  .main {
    padding: 0 1rem 2rem 1rem;
  }
</style>
