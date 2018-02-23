<template lang="html">
  <div v-for="item in items">
    <notification remember="true">
        {{item.message}}
    </notification>
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
