import Vue from 'vue'
import App from '../component/app.vue'
import VueInstant from 'vue-instant'
Vue.use(VueInstant)

Vue.component('notification', require('vue-bulma-notifications'))

var app=new Vue({
  el:'#app',
  data:{
    name:'chromext'
  },
  render: h =>h(App)
})
