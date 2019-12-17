import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import Toasted from "vue-toasted";
import "@/assets/css/tailwind.css";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import "@/assets/css/style.css";

import 'epic-spinners/dist/lib/epic-spinners.min.css'
import { AtomSpinner } from 'epic-spinners/dist/lib/epic-spinners.min.js'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Modal from './components/Modal.vue';
Vue.config.productionTip = false


library.add(fas);

const logged_user = localStorage.getItem('godir_user') || undefined;
const apiBaseUrl = "http://localhost:9000/v1";
axios.defaults.baseURL = apiBaseUrl;


Vue.prototype.$axios = axios;
Vue.prototype.$apiBaseUrl = apiBaseUrl;


if(logged_user != undefined) {
  Vue.prototype.$auth = JSON.parse(logged_user);
}else{
  Vue.prototype.$auth = undefined;
}



// COMPONENTS
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("modal", Modal);
Vue.use(Toasted);



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
