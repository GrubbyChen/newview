import Vue from 'vue'
import './styles/reset.less'
import './plugins/vuetify'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
