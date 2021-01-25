import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAnalytics from 'vue-analytics';
// import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),

}).$mount('#app')

Vue.use(VueAnalytics, {
  id: 'G-964MQ92E0M'
})