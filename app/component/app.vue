<template lang="html">
  <div class="container" id="root">
    <tabs>
      <tab name="持仓/自选" :selected="true">
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
          <vue-instant
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
          name="customName"
          placeholder="custom placeholder"
          type="spotify">
          </vue-instant>
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
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=342d3061b70d2747a1e159ae9a7e9a36&query=' + this.value)
        .then(function(response) {
          response.data.results.forEach(function(a) {
            that.suggestions.push(a)
          })
        })
    }
  },
  components: {
    tabs: tabs,
    tab: tab,
    zixuan: zixuan,
    jixuan: jixuan,
    notify: notify,
    settings: settings
  }
}
</script>

<style lang="css">
@import '../../node_modules/vue-instant/dist/vue-instant.css'
</style>
