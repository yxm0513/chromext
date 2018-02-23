<template lang="html">
  <table class="table is-striped" id="jixuan">
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
          <tr v-for="item in items">
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
</template>

<script>
export default {
  data () {
  return {
      items: [
        { message: 'Foo', price: 1 },
        { message: 'Bar', price: 2 , selected: 'yes'}
      ]
    }
  }
}
</script>
