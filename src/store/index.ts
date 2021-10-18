import { createStore } from 'vuex';
import axios from 'axios';

import IProducts from '@/models/IProducts';
import IProduct from '@/models/IProduct';
import INotify  from '@/models/INotify';
import { ENotifyType } from '@/models/ENotifyType';

const API_URL = process.env.VUE_APP_URL;

const allProductURL = `${API_URL}/products`;
const currentProductURL = (id: string) => {
  return `${API_URL}/products/${id}`;
}

export default createStore({
  state: {
    productList: null as Array<IProduct> | null,
    productCurrent: null as IProduct | null,
    productCount: 0 as number,

    // notify
    notify: null as INotify | null,

    // loader
    loadProcess: false as boolean
  },
  getters: {
    productList (state): Array<IProduct> | null {
      return state.productList;
    },
    productCurrent (state): IProduct | null {
      return state.productCurrent;
    },
    productCount (state): number {
      return state.productCount;
    },

    // notify
    notify (state): INotify | null {
      return state.notify;
    },

    // loader
    loadProcess (state): boolean {
      return state.loadProcess;
    },

  },
  mutations: {
    setProductList (state, productList: Array<IProduct> | null): void {
      state.productList = productList;
    },
    setProductCurrent (state, product: IProduct | null): void {
      state.productCurrent = product;
    },
    setProductCount (state, ProductCount: number): void {
      state.productCount = ProductCount;
    },

    // notify
    setNotify (state, payload: INotify | null) {
      state.notify = payload
    },

    // loader
    setloadProcess (state, loadStatus: boolean) {
        state.loadProcess = loadStatus;
    }
  },
  actions: {
    getProductList: async ({ commit }) => {
      try {
        const responce: IProducts = (await axios.get(allProductURL)).data;
        commit('setProductList', responce.data);
        commit('setProductCount', responce.pagination.total);

      } catch (error: any) {
        const notify: INotify = {
          message: error?.message,
          type: ENotifyType.error
        }
        commit('setNotify', notify);
      } finally {
        // commit('onloadProcess');
      }
    },
    getProductCurrent: async ({ commit }, id) => {
      try {
        const responce: IProducts = (await axios.get(currentProductURL(id))).data;
        commit('setProductCurrent', responce);

      } catch (error: any) {
        const notify: INotify = {
          message: error?.message,
          type: ENotifyType.error
        }
        commit('setNotify', notify);
      }
    },
  },
  modules: {
  }
})
