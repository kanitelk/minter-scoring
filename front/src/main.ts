import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from "vuetify";

Vue.use(Vuetify);

Vue.config.productionTip = false;

import 'normalize.css';
// import "vuetify/src/styles/main.sass";

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
