import Vue from 'vue'
import App from './App'
import post from './utils/post'

Vue.config.productionTip = false
Vue.prototype.$post = post.post
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
