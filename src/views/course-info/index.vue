<template>
<div class='course-info'>
  <van-cell-group  class="container" :style="bottomStyle" >
    <van-cell class="infoImg">
      <img :src="courseDatas.courseImgUrl" alt="courseDatas.courseName">
    </van-cell>
    <van-cell class="courseInfoField">
      <h3 v-text="courseDatas.courseName"></h3>
      <p v-text="courseDatas.previewFirstField"></p>
      <div class="price">
        <span class="discounts">￥{{ courseDatas.discounts }}</span>
        <span>￥{{ courseDatas.price }}</span>
        <div class="sales">
          <span>{{ courseDatas.sales }}已购</span>
          <span>每周三、五更新</span>
        </div>
      </div>
    </van-cell>
    <van-cell>
      <van-tabs v-model="active" scrollspy sticky>
        <van-tab title="详情">
          <div v-html="courseDatas.courseDescription"></div>
        </van-tab>
        <van-tab title="内容">
          <section-info
            v-for="item in sectionDatas"
            :key="item.id"
            :sectionDatas="item"
          />
        </van-tab>
      </van-tabs>
    </van-cell>
  </van-cell-group>
  <van-tabbar v-if="!courseDatas.isBuy" class="coursebottom">
    <div class="price">
      <span v-text="courseDatas.discountsTag"></span>
      <span class="discounts">￥{{ courseDatas.discounts }}</span>
      <span>￥{{ courseDatas.price }}</span>
    </div>
    <van-button @click="hanleToPay" type="primary">购买</van-button>
  </van-tabbar>
</div>
</template>

<script>
import { CellGroup as VanCellGroup, Cell as VanCell, Tab as VanTab, Tabs as VanTabs, Tabbar as VanTabbar, Button as VanButton } from 'vant'
import { getCourseInfoById, getSectionAndLesson } from '@/services/course'
import SectionInfo from './components/sectionInfo'
export default {
  name: 'CourseInfo',
  components: {
    SectionInfo,
    VanCell,
    VanCellGroup,
    VanTab,
    VanTabs,
    VanTabbar,
    VanButton
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      courseDatas: [],
      active: 0,
      sectionDatas: [],
      // 支付样式
      bottomStyle: {}
    }
  },
  created () {
    this.loadCourseInfoById()
    this.loadSectionAndLesson()
  },
  methods: {
    // 跳转支付界面
    hanleToPay () {
      // 登录过才能跳转
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    // 获取章节信息
    async loadSectionAndLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sectionDatas = data.content.courseSectionList
      // console.log(data)
    },
    async loadCourseInfoById () {
      const { data } = await getCourseInfoById(this.courseId)
      this.courseDatas = data.content
      // console.log(data)
      if (data.content.isBuy) {
        this.bottomStyle.bottom = 0
      }
    }
  }
}

</script>
<style  lang='scss' scoped>
  // 头部照片样式
  .infoImg.van-cell{
    padding: 0;
    .van-cell__value--alone{
      width: 100%;
      height: 300px;
      img{
        height: 300px;
        width: 100%;
      }
    }
  }
  // courseName
  .courseInfoField.van-cell{
    padding: 20px 0 10px 30px;
    h3,p{
      margin: 0;
    }
    p{
      margin: 10px 0;
      color: rgb(83, 85, 85);
    }
    .van-cell__value--alone{
      color: rgb(54, 54, 54);
    }
    .price{
      display: flex;
      .sales{
        padding-left: 50px;
        color: rgb(116, 113, 113);
        span{
          background-color: rgba(113, 114, 114, 0.2);
          margin-right: 10px;
          height: 20px;
          line-height: 20px;
          padding: 5px;
          border-radius: 5px;
        }
      }
    }
  }
  .discounts{
    color: rgb(238, 37, 11);
    font-size: 20px !important;
    padding-right: 10px;
  }
  .coursebottom{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    line-height: 50px;
    align-items: center;
    span{
      font-size: 14px;
      margin-right: 5px;
    }
  .van-button{
    width: 50%;
    height: 80%;
  }
  }
  .container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
</style>
