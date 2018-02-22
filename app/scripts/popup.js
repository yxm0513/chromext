import Vue from 'vue';
import App from '../component/app.vue';

import VueFire from 'vuefire'

Vue.use(VueFire)

var app=new Vue({
  el:'#app',
  data:{
    name:'chromext'
  },
  render: h =>h(App)
})
