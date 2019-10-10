import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
// @ts-ignore
import linkify from 'vue-linkify'

Vue.config.productionTip = false

import './main.scss';
import 'normalize.css';

Vue.directive('linkified', linkify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
