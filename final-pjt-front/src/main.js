import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueYoutube from 'vue-youtube'
import Carousel3d from 'vue-carousel-3d';
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";

Vue.use(Carousel3d)
Vue.use(VueYoutube)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
