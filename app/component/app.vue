<template lang="html">
  <div class="container" id="root">
    <tabs>
      <tab name="持仓/自选" :selected="true">
        <div class="columns">
          <div class="column">
          <search
          :suggestion-attribute="suggestionAttribute"
          v-model="value"
          :disabled="false"
          @input="changed"
          @click-input="clickInput"
          @click-button="clickButton"
          @selected="selected"
          @enter="enter"
          @key-up="keyUp"
          @key-down="keyDown"
          @key-right="keyRight"
          @clear="clear"
          @escape="escape"
          :show-autocomplete="true"
          :autofocus="false"
          :suggestions="suggestions"
          name="customName">
        </search>
        </div>
        </div>
        <zixuan></zixuan>
      </tab>
      <tab name="机选">
        <jixuan></jixuan>
      </tab>
      <tab name="监控">
        <notify></notify>
      </tab>
      <tab name="设置">
        <settings></settings>
      </tab>
    </tabs>
  </div>
</template>

<script>
import tabs from './tabs.vue';
import tab from './tab.vue';
import zixuan from './zixuan.vue';
import jixuan from './jixuan.vue';
import notify from './notify.vue';
import settings from './settings.vue';
import search from './search.vue'
import axios from 'axios'

export default {
  data() {
    return {
      value: '',
      suggestionAttribute: 'original_title',
      suggestions: [],
      selectedEvent: ""
    }
  },
  methods: {
    clickInput: function() {
      this.selectedEvent = 'click input'
    },
    clickButton: function() {
      this.selectedEvent = 'click button'
    },
    selected: function() {
      this.selectedEvent = 'selection changed'
      console.log('')
    },
    enter: function() {
      this.selectedEvent = 'enter'
    },
    keyUp: function() {
      this.selectedEvent = 'keyup pressed'
    },
    keyDown: function() {
      this.selectedEvent = 'keyDown pressed'
    },
    keyRight: function() {
      this.selectedEvent = 'keyRight pressed'
    },
    clear: function() {
      this.selectedEvent = 'clear input'
    },
    escape: function() {
      this.selectedEvent = 'escape'
    },
    changed: function() {
      var that = this
      this.suggestions = []
      axios.get('http://smartbox.gtimg.cn/s3/?t=all&q=' + this.value)
        .then(function(response) {
          var text = "{\"" + response.data.replace("=", "\":") + "}"
          if (!!text) {
            var obj = JSON.parse(text)
            text = obj.v_hint
            var list = text.split("^")
            list = list.map(row => row.split("~"))
            /*[
                ["sh","600555","\u4e5d\u9f99\u5c71","jls","GP-A"],
                ["us","s.n","\u65af\u666e\u6797\u7279","splt","GP"]
            ]*/

            list.forEach(function(a) {
              console.log(a)
              if(!/^(sz|sh)$/.test(a[0])){
                return true
              }
              that.suggestions.push(a)
            })
          }
        })
    }
  },
  components: {
    tabs: tabs,
    tab: tab,
    zixuan: zixuan,
    jixuan: jixuan,
    notify: notify,
    settings: settings,
    search: search
  }
}
</script>

<style lang="css">
</style>
