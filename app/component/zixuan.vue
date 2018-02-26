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
  data() {
    return {
      items: [],
      code: []
    }
  },
  methods: {
    getzixuan: function() {
      var that = this;
      axios.get('http://localhost:3000/api/v1/zixuan').then(function(response) {
        var code = response.data
        console.log(code)
        code.forEach(function(element) {
          that.code.push(element.code)
        })
      })

    },
    loadData: function() {
      var query = this.code.join(',')
      var date = Date();
      var update = []
      axios.get('http://sqt.gtimg.cn/utf8/q=' + query + '&_t=' + (+new Date()))
        .then(function(response) {
          var stocks = response.data.split(";")
          stocks.forEach(function(stock) {
            if(/~/.test(stock)){
              var values = stock.split("=")[1]
              var arr = values.split("~")
              var temp = {
                name: arr[1],
                code: arr[2],
                price: arr[3],
                growRate: arr[32] + '%',
                hands: (arr[38] ? arr[38] : '0.00') + '%',
                className: ''
              }
              update.push(temp)
          }
          })
        })
        this.items=update
    }
  },
  mounted() {
    this.getzixuan()
    this.loadData()
    var self = this
    this.timer = setInterval(function() {
      self.loadData()
    }, 3000)
  }
}
</script>
