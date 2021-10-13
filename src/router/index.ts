import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/tppHome.vue';
import Products from '../views/tppProducts.vue'
import SuccessBuy from '@/components/products/tppSuccessBuy.vue';
import ErrorBuy from '@/components/products/tppErrorBuy.vue';
import CheckOut from '@/components/products/tppCheckOut.vue';
import ProductById from '@/views/tppProductById.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/success',
    name: 'SuccessBuy',
    component: SuccessBuy
  },
  {
    path: '/product/:id',
    name: 'ProductById',
    component: ProductById
  },
  {
    path: '/error',
    name: 'ErrorBuy',
    component: ErrorBuy
  },
  {
    path: '/products/buy/:id',
    name: 'CheckOut',
    component: CheckOut
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
