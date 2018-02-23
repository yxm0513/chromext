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


export default {
  data() {
    return {
      name: 'zixuan'
    }
  },
  components: {
    tabs: tabs,
    tab:tab,
    zixuan: zixuan,
    jixuan:jixuan,
    notify: notify,
    settings: settings
  }
}
</script>

<style lang="css">
</style>
