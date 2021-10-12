import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'

import VueToast from 'vue-toast-notification';

const VueToastConfig = {
    position: 'bottom-right',
    duration: 3500,
    queue: true
}

createApp(App)
.use(store)
.use(VueToast, VueToastConfig)
.use(router)
.mount('#app');
