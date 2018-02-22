<template lang="html">
  <div class="container">
    <div class="tabs">
      <ul>
        <li class="is-active"><a>持仓/自选</a></li>
        <li><a>机选</a></li>
        <li><a>监控</a></li>
        <li><a>设置</a></li>
      </ul>
    </div>
    <div class="columns">
      <div class="column">
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="代码/名称/拼音">
              </div>
              <div class="control">
                <a class="button is-primary">搜索</a>
              </div>
            </div>
      </div>
      <div class="column">
        <table class="table is-striped" id="zixuan">
            <thead>
                <tr>
                    <th>名称(代码)</th>
                    <th>最新价</th>
                    <th>涨跌幅</th>
                    <th>换手率</th>
                    <th>置顶</th>
                    <th>持仓</th>
                    <th>删除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in stock">
                  <td> {{ item.message }} </td>
                  <td> {{ item.price }} </td>
                  <td> {{ item.price }} </td>
                  <td> {{ item.price }} </td>
                  <td> {{ item.price }} </td>
                  <td> {{ item.price }} </td>
                  <td> {{ item.price }} </td>
                </tr>
            </tbody>
        </table>
          <zixuan></zixuan>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
let config = {
    apiKey: "AIzaSyDJ2TnfPDvDmbuBjU3cNBBe0RYYibhrJd4",
    authDomain: "chromext-simon.firebaseapp.com",
    databaseURL: "https://chromext-simon.firebaseio.com",
    projectId: "chromext-simon",
    storageBucket: "chromext-simon.appspot.com",
    messagingSenderId: "624950787232"
  };


let app = Firebase.initializeApp(config)
let db = app.database()
let stockref = db.ref('stock')

import Zixuan from './zixuan.vue';
export default {
  data() {
    return {
      name: 'zixuan'
    }
  },
  firebase: {
    stock: stockref
  },
  components: {
    zixuan: Zixuan
  }
}
</script>

<style lang="css">
</style>
