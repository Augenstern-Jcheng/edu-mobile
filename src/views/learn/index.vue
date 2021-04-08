<template>
<div class='learn'>
  <van-nav-bar
    title="已购课程"
  />
  <!-- list -->
  <list :feachData="feachData"></list>
  <!-- 底部区域 -->
  <layout-footer></layout-footer>
</div>
</template>

<script>
import { NavBar as VanNavBar } from 'vant'
import { getPurchaseCourse } from '@/services/course'
import LayoutFooter from '@/components/layoutfooter'
import List from '@/components/list'
export default {
  name: 'learn',
  components: {
    LayoutFooter,
    List,
    VanNavBar
  },
  methods: {
    feachData () {
      return getPurchaseCourse()
    }
  }
}

</script>
<style  lang='scss' scoped>
  .list{
    top: 50px;
    bottom: 50px
  }
</style>
