import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from "vuesax";
import axios from 'axios';
import "@/assets/css/tailwind.css";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import "@/assets/css/style.css";

Vue.config.productionTip = false

axios.defaults.baseURL = "http://192.168.43.190:9000/v1";

const logged_user = localStorage.getItem('godir_user') || undefined;

Vue.prototype.$axios = axios;
Vue.prototype.$auth = JSON.parse(logged_user);

Vue.use(Vuesax, {
  // options here
});



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
