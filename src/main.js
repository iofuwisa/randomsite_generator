import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAnalytics from 'vue-analytics';
// import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'G-3316ZV1WTJ'
})

new Vue({
  vuetify,
  render: h => h(App),
  created: () => {
    // 言語を日本語に設定
    document.documentElement.setAttribute('lang', 'ja')
  },
}).$mount('#app')
