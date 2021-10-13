<template>
  <article class="product">
    <header class="product__header">
      <div class="product__avatar">
        <img :src="productCurrentAvatar" />
      </div>
      <div class="product__company" v-if="productCurrent?.company">
        {{productCurrent?.company}}
      </div>
    </header>
    <main class="product__main">
      <h2 class="product__title">
        {{productCurrent?.title}}
      </h2>
      <section class="product__buy">
        <span>
          price:
        </span>
        <span>
          {{productCurrent?.price + ' $ '}}
        </span>
      </section>

      <h1>DESCRIPTION</h1>
      <section class="product__details">
        <details v-if="productDetails[1]">
          <summary>{{productDetails[0]}}</summary>
          {{productCurrent?.details}}
        </details>
        <div v-else>
          {{productDetails[0]}}
        </div>
      </section>

      <section class="product__buttons">
        <button @click="payFromStripeForm">
          <font-awesome-icon :icon="['fas', 'credit-card']" />
          Buy now for ${{productCurrent?.price}}
        </button>

        <button @click="payFromCustumForm">
          <font-awesome-icon :icon="['fas', 'credit-card']" />
           Buy now for ${{productCurrent?.price}}
        </button>
      </section>
    </main>
  </article>

</template>

<script lang="ts">
/*
add link to image and title
*/
import { PropType, defineComponent } from 'vue';
import IProduct from '@/models/IProduct';
import { loadStripe } from "@stripe/stripe-js";

const stripe_pk = process.env.VUE_APP_STRIPE_PK as string;

export default defineComponent({
  name: 'ProductItem',
  data () {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stripe: null as any
    }
  },
  components: {
  },
  props: {
    productCurrent: {
      type: Object as PropType<IProduct>
    },
    fullInformation: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  computed: {
    productCurrentAvatar (): string {
      let avatar = this.productCurrent?.avatar;
      if (!avatar) avatar = '@/assets/default-product.jpg';
      return avatar;
    },
    productDetails (): [string, boolean] {
      let result: [string, boolean];
      if (this.productCurrent?.details) {
        const details = this.productCurrent?.details;
        if (details.length >= 150) {
          result = [details.slice(0, 149) + '...', true];
        } else result = [details, false];
      } else result = ['', false];
      return result;
    }
  },
  methods: {
    payFromStripeForm (): void {
      this.stripe.redirectToCheckout({
        successUrl: "http://localhost:8080/success",
        cancelUrl: "http://localhost:8080/products",
        lineItems: [
          {
            price: this.productCurrent?.price_id,
            quantity: 1
          }
        ],
        mode: "payment"
      })
    },
    payFromCustumForm (): void {
      this.$router.push(`/products/buy/${this.productCurrent?._id}`)
    }
  },
  async mounted () {
    this.stripe = await loadStripe(stripe_pk);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .product{
    display: flex;

  }

  .product--small {
    grid-template-columns: 1fr;
  }

  .product__header{
    position: relative;
    min-width: 280px;
    max-width: 500px;
    flex-basis: 48%;

    flex-grow: 1;
    flex-shrink: 0;
    img {
      width: 100%;
    }
  }
  .product__company{
    position: absolute;
    bottom: 0;
    right: 0;

    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;

    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.76);
    clip-path: polygon(0 100%, 2rem 0, 100% 0, 100% 100%);

    min-width: 15rem;
  }


  .product__main {
    padding: 1rem 2rem;
    

    .product__title {
      font-size: 1.85rem;
      padding: 1.5rem 0rem 1.5rem;
    }

    .product__buy {
      font-size: 1.7rem;
      padding: 1rem 0;

      span {
        padding-right: 1.5rem;
      }
    }

    .product__details {
      margin: 1rem 0;
      line-height: 1.4;
      font-size: 1.5rem;
    }

    .product__buttons {
      font-size: 1.5rem;
      padding: 1rem 1.5rem;

      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      button {
        margin: 1.5rem 1.5rem 0 0;
        padding: 1rem 1.5rem;
        white-space: pre-line;

        flex-basis: 45%;
        flex-grow: 1;

        background: rgba(255, 239, 0, 0.64);
        background-image: linear-gradient(top, rgba(255, 239, 0, 0.64), #FFD016);
        border-radius: 1rem;
        color: #47008a;
        font-weight: 700;
        box-shadow: 1px 1px 10px 0 #053fe0d7;
        text-decoration: none;
        cursor: pointer;
      }

      button:hover {
         border: solid #99C624 1px;
         background: #1E62D0;
         background-image: linear-gradient(top, #1E62D0, #3D94F6);
         color: #fff;
      }
    }
  }
  /* help ... */
  details[open] summary {
    display: none;
  }
</style>
