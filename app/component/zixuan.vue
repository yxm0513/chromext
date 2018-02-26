<template lang="html">
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
          <tr v-for="item in items" v-model="items">
            <td> {{ item.name }} ({{item.code}}) </td>
            <td> {{ item.price }} </td>
            <td> {{ item.growRate }} </td>
            <td> {{ item.hands }} </td>
            <td> {{ }} </td>
            <td> {{ }} </td>
            <td> {{ }} </td>
          </tr>
      </tbody>
  </table>
</template>

<script>
import axios from 'axios'
export default {
  data () {
  return {
      items: [
        { name: 'Foo', price: 1 },
        { name: 'Bar', price: 2 , selected: 'yes'}
      ]
    }
  },
  methods: {
    loadData: function (){
      var date = Date();
      var that = this;
      axios.get('http://sqt.gtimg.cn/utf8/q=sh600352&_t=' + (+new Date()))
        .then(function(response) {
            var stocks = response.data.split("=")[1]
            var arr = stocks.split("~")
            var temp = {
  						name : arr[1],
  						code : arr[2],
  						price : arr[3],
  						growRate : arr[32] + '%',
  						hands : (arr[38] ? arr[38] : '0.00') + '%',
  						className : ''
  					}
            console.log(temp)
            that.items.push(temp)
        })
    }
  },
  mounted() {
    //this.items.push(this.loadData())
    this.loadData()
    console.log(this.items)
    var self=this
    this.timer = setInterval(function(){
      self.loadData()
    }, 1000)
  }
}
</script>
