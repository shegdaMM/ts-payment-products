<template>
  <article class="product-pay-wrapper">
    <section class="product-info">
      <header class="product__header">
        <div class="product__avatar">
          <img :src="productCurrentAvatar" />
        </div>
        <div class="product__company" v-if="productCurrent?.company">
          {{productCurrent?.company}}
        </div>
    </header>
      <div class="product-text">
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
        <section class="product__details">
        <details v-if="productDetails[1]">
          <summary>{{productDetails[0]}}</summary>
          {{productCurrent?.details}}
        </details>
        <div v-else>
          {{productDetails[0]}}
        </div>
      </section>
      </div>
    </section>
    <section class="product-pay">
      <form @submit.prevent="handleSubmit($event)">
        <fieldset :class="{ dis: loading }" class="fields">
          <div class="product-pay-field"></div>
          <div class="product-pay-field">
            <label for="name_field">Name</label>
            <input
              placeholder="Jane Doe"
              type="text"
              name="name"
              id="name_field"
              class="product-pay-input"
            />
          </div>
          <div class="product-pay-field">
            <label for="email_field">Email</label>
            <input
              placeholder="jane.doe@example.com "
              type="email"
              name="email"
              id="email_field"
              class="product-pay-input"
            />
          </div>
          <div class="product-pay-field">
            <label for="address_field">Address</label>
            <input
              placeholder="1234 Sycamore Street"
              type="text"
              name="address"
              id="address_field"
              class="product-pay-input"
            />
          </div>
          <div class="product-pay-field">
            <label for="city_field">City</label>
            <input
              placeholder="Reno"
              type="text"
              name="city"
              id="city_field"
              class="product-pay-input"
            />
          </div>
          <div class="product-pay-field">
            <label for="state_field">State</label>
            <input
              placeholder="Nevada"
              type="text"
              name="state"
              id="state_field"
              class="product-pay-input"
            />
          </div>
          <div class="product-pay-field">
            <label for="zip_field">Zip</label>
            <input
              placeholder="89523"
              type="text"
              name="zip"
              id="zip_field"
              class="product-pay-input"
            />
          </div>
          <div class="product-pay-field">
            <label for="email_field">Credit Card</label>
            <div id="stripe-element-mount-point" class="product-pay-input product-pay-input-card" />
          </div>
        </fieldset>
        <div class="product-pay-field">
          <button
            type="submit"
            class="product-pay-btn"
            :class="{ dis: loading }"
          >
            {{ loading ? "Loading..." : `PAY ${productCurrent?.price}` }}
          </button>
        </div>
      </form>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

const stripe_pk = process.env.VUE_APP_STRIPE_PK as string;
const style = {
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: "800",
      fontFamily: "Press Start 2P",
      fontSize: "22px",
      backgroundColor: "#fff",
      borderRadius: "30%",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "green",
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "red"
    }
  }
};

const Server = process.env.VUE_APP_URL;
const paymentServerByID = (id: string): string => {
  return `${Server}/payment/${id}`;
}

export default defineComponent({
  name: 'CheckOut',
  props: {
    msg: String,
  },
  data () {
    return {
      id: this.$route.params.id as string,
      loading: true as boolean,
      elements: {} as any,
      stripe: null as any
    }
  },
  computed: {
    ...mapGetters(['productCurrent']),
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
    ...mapActions(['getProductCurrent']),
    async handleSubmit(event) {
      if (this.loading) return;
      this.loading = true;
      const billingDetails = this.getUserDataFromForm(event);
      const cardElement = this.elements.getElement("card");
      try {
        const secret = this.getPaymentUserIdInStripe();

        const paymentMethodReq = await this.stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails
        });

        const { error } = await this.stripe.confirmCardPayment(secret, {
          payment_method: paymentMethodReq.paymentMethod.id
        });
        this.loading = false;
        this.$router.push("/success");
      } catch (error) {
        console.log("error", error);

      } finally {
        this.loading = false;
      }
    },
     getUserDataFromForm (event: any): any{
       const { name, email, address, city, state, zip } = Object.fromEntries(
        new FormData(event.target)
      );

      const billingDetails = {
        name,
        email,
        address: {
          city,
          line1: address,
          state,
          postal_code: zip
        }
      };
      return billingDetails;
    },
    async getPaymentUserIdInStripe (): Promise<string> {
        const response: any = (await axios.post(paymentServerByID(this.productCurrent?._id))).data;
        return response.client_secret;
    },

  },
  async created () {
   await this.getProductCurrent(this.id);
  },
  async mounted () {
    this.stripe = await loadStripe(stripe_pk);
    this.elements = this.stripe.elements();
    const element: any = this.elements.create('card', style);
    element.mount("#stripe-element-mount-point");
    this.loading = false;
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.product-pay-wrapper {
  display: flex;
}

.product-info {
  max-width: 500px;
  padding: 0 1rem 1rem 1rem;

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

  .product__title {
      font-size: 1.5rem;
      padding: 1.3rem 0rem 0.5rem;
    }

    .product__buy {
      font-size: 1.5rem;
      padding: 1rem 0;

      span {
        padding-right: 1.5rem;
      }
    }


  details[open] summary {
    display: none;
  }

  // pay
  .product-pay {
    padding: 0.5rem 1.5rem;

    .product-pay-field {
      margin: 1rem 0;
      max-width: 600px;

      label {
        display: inline-block;
        min-width: 9rem;
        font-size: 1.3rem;
        color: #01296b;

      }

      input {
        min-width: 400px;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.5rem;
        color: #01296b;
      }

      .product-pay-input-card {
        padding: 1rem;
      }
    }


  }
  .product-pay-btn {
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

  .product-pay-btn:hover {
         border: solid #99C624 1px;
         background: #1E62D0;
         background-image: linear-gradient(top, #1E62D0, #3D94F6);
         color: #fff;
      }
</style>
