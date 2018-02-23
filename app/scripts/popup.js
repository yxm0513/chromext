import Vue from 'vue';
import App from '../component/app.vue';

Vue.component('notification', require('vue-bulma-notifications'))

var app=new Vue({
  el:'#app',
  data:{
    name:'chromext'
  },
  render: h =>h(App)
})
