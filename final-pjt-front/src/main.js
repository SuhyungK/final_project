import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'



// 부트 스트랩
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)


// ShortPage
import VueYoutube from 'vue-youtube'
import Carousel3d from 'vue-carousel-3d'
Vue.use(Carousel3d)
Vue.use(VueYoutube)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


