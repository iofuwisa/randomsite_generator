import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAnalytics from 'vue-analytics';
import router from './router'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'G-964MQ92E0M',
  router
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

