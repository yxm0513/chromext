<template lang="html">
  <div>
  <div v-for="item in items">
    <notification>
        {{item.message}}
    </notification>
  </div>
</div>
</template>

<script>
export default {
  data () {
  return {
      items: [
        { message: 'Foo'},
        { message: 'Bar'}
      ]
    }
  }
}
</script>
