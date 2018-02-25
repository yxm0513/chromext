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
            <td> {{ item.name }} </td>
            <td> {{ item.price }} </td>
            <td> {{ item.price }} </td>
            <td> {{ item.price }} </td>
            <td> {{ item.price }} </td>
            <td> {{ item.price }} </td>
            <td> {{ item.price }} </td>
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
      ],
      ret: ''
    }
  },
  methods: {
    loadData: function (){
      var date = Date();
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
            this.ret = temp
        })
    }
  },
  mounted() {
    //this.items.push(this.loadData())
    this.loadData()
    console.log(this.ret)
    console.log(this.loadData())
    // var self=this
    // this.timer = setInterval(function(){
    //   self.items.push(self.loadData())
    // }, 1000)
  }
}
</script>
