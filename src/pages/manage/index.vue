<template>
  <div class="wrap">
    <div class="tab" @click="addCategory">
      <div class="tabItem" :class="{tabItemActivity: currentTab === 1}" @click="SwitchTab(1)">产品管理</div>
      <div class="tabItem" :class="{tabItemActivity: currentTab === 2}" @click="SwitchTab(2)">分类管理</div>
    </div>
    <div class="content">
      <div v-show="currentTab === 1">
        <procudt />
      </div>

      <div v-show="currentTab === 2">
        <category />
      </div>
    </div>
  </div>
</template>

<script>
  import procudt from './components/product'
  import category from './components/category'
  export default {
    components: {procudt, category},
    data () {
      return {
        currentTab: 1
      }
    },
    methods: {
      SwitchTab (num) {
        this.currentTab = num
      }
    },
    onLoad () {
    }
  }
</script>
<style scoped>
  .wrap {
    width: 100%;
    height: 100vh;
    background: #f5f5f5;
  }
  .content {
    width: 100%;
    height: calc(100vh - 100rpx);
    overflow-y: scroll;
  }
  .tab {
    width: 100%;
    height: 100rpx;
    display: flex;
    background: #fff;
  }
  .tabItem {
    padding: 0 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
  .tabItemActivity {
    color: #37B3FF;
    border-bottom: 3px solid #37B3FF;
  }
</style>
