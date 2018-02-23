<template lang="html">
  <div>
    <div class="tabs">
      <ul>
        <li v-for="tab in tabs" v-bind:class="{'is-active': tab.isActive}">
          <a @click="selectTab(tab)">
            {{ tab.name }}
          </a>
         </li>
      </ul>
    </div>
    <div class="tab-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import tab from './tab.vue';
export default {
  data() {
    return {
      tabs: [],
    }
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
     this.tabs.forEach(
      function(tab){
        tab.isActive = (selectedTab.name == tab.name)
      }
     )
    }
  },
  components :{
    tab: tab
  }
}

</script>
