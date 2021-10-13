import { createApp } from 'vue';
import tppApp from './tppApp.vue';
import router from './router';
import store from './store';

import '@/assets/main.scss';

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const VueToastConfig = {
    position: 'bottom-right',
    duration: 3500,
    queue: true
}

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faTshirt, faCreditCard } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faTshirt, faCreditCard);

createApp(tppApp)
.component("font-awesome-icon", FontAwesomeIcon)
.use(store)
.use(VueToast, VueToastConfig)
.use(router)
.mount('#app');
