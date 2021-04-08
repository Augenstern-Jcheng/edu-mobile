<template>
<div class='layout-footer'>
  <van-tabbar route>
  <van-tabbar-item replace to="/" icon="records">选课</van-tabbar-item>
  <van-tabbar-item replace to="/learn" icon="tv-o">学习</van-tabbar-item>
  <van-tabbar-item replace to="/user" icon="contact">我的</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from 'vant'
export default {
  name: 'LayoutFooter',
  components: {
    VanTabbar,
    VanTabbarItem
  }
}

</script>
<style  lang='scss' scoped></style>
