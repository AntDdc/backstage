import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/reset.css'
import '@/utils/routetIntercept'
import moment from 'moment'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
import axios from 'axios'
Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
Vue.config.productionTip = false

Vue.filter('formdate',(v) => {
  return moment(v).format('YYYY-MM-DD')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
