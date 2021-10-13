<template>
  <header class="header">
    <div class="logo-wapper">
      <router-link to="/">
        <div class="logo-img">
          <img src="@/assets/logo.svg" alt="logo">
        </div>
      </router-link>
    </div>

    <nav class="navigation">
      <li class="navigation__item">
        <router-link to="/" >
          <font-awesome-icon :icon="['fas', 'home']" />
          <span>HOME</span>
        </router-link>
      </li>

      <li class="navigation__item">
        <router-link to="/products" >
          <font-awesome-icon :icon="['fas', 'tshirt']" />
          <span>PRODUCTS</span>
        </router-link>
      </li>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header'
});
</script>

<style lang="scss" scoped>
  .header {
    margin: 0 0 1rem 0;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.644);

    border-radius: 0 0 3rem 3rem;

    display: flex;
    justify-content: flex-start;

  }

  .logo-wapper {
    min-width: 9rem;
    padding-right: 1rem;
  }

  .navigation {
    display: flex;
    list-style: none;
    align-items: center;

    .navigation__item {
      padding: 0 0.5rem;


      svg, span {
        display: block;
        margin: 0 auto;
        padding: 0 0 0.1rem 0;
      }
      a {
        color: rgb(17, 151, 117);
        text-decoration: none;

        font-weight: 500;
      }
      a:hover {
        color:  rgb(6, 97, 74);;
        border-radius: 2rem;
      }
    }
  }
</style>
