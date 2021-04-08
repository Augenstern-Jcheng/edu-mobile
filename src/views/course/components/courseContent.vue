<template>
<div class='course-content'>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item
      v-for="item in filterAds"
      :key="item.id"
    >
      <img :src="item.img" />
    </van-swipe-item>
  </van-swipe>
  <list :feachData='feachData'></list>
</div>
</template>

<script>
import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from 'vant'
import { getAllAds, getQueryCourses } from '@/services/course'
import List from '@/components/list'
export default {
  name: 'CourseContent',
  components: {
    List,
    VanSwipe,
    VanSwipeItem
  },
  data () {
    return {
      // 轮播广告key
      spaceKeys: 999,
      // 轮播广告数据
      swipeDatas: []
    }
  },
  created () {
    this.loadAllAds()
  },
  methods: {
    feachData (val) {
      return getQueryCourses(val)
    },
    async loadAllAds () {
      const { data } = await getAllAds(this.spaceKeys)
      // console.log(data)
      if (data.success) {
        this.swipeDatas = data.content[0].adDTOList
      }
    }
  },
  computed: {
    // 筛选轮播上架广告
    filterAds () {
      return this.swipeDatas.filter(item => item.status === 1)
    }
  }
}

</script>
<style  lang='scss' scoped>
  .my-swipe{
    width: 100%;
    .van-swipe-item{
      overflow: hidden;
      display: flex;
      justify-content: center;
      img{
        height: 170px;
        width: 375px;
      }
    }
  }
  .list{
    top: 220px;
    bottom: 50px
  }
</style>
