<template>
<div class='user'>
  <van-cell-group>
    <van-cell class="info" :border="false">
      <van-image round :src="userDatas.portrait || 'https://s0.lgstatic.com/common/image/pc/default_boy_headpic1.png'"></van-image>
      <div class="user-info">
        <h3 v-text="userDatas.userName"></h3>
        <span><van-icon name="edit" />编写个人信息</span>
      </div>
    </van-cell>
    <van-cell class="grid">
      <van-grid>
        <van-grid-item>
          <span class="grid-top">14.05</span>
          <span>学习时长</span>
        </van-grid-item>
        <van-grid-item>
          <span class="grid-top">200</span>
          <span>钱包/勾豆</span>
        </van-grid-item>
        <van-grid-item>
          <span class="grid-top">1</span>
          <span>优惠券</span>
        </van-grid-item>
        <van-grid-item>
          <span class="grid-top">213</span>
          <span>学分</span>
        </van-grid-item>
      </van-grid>
    </van-cell>
    <van-cell title="分销中心" icon="user-o" is-link value="收益200元"></van-cell>
    <van-cell title="个性化设置" icon="setting-o" is-link></van-cell>
    <van-cell title="我的下载" icon="down" is-link></van-cell>
    <van-cell title="帮助与反馈" icon="question-o" is-link></van-cell>
    <van-cell title="关于拉钩教育" icon="info-o" is-link value="v2.0.0"></van-cell>
  </van-cell-group>
  <!-- 底部 -->
  <layout-footer></layout-footer>
</div>
</template>

<script>
import {
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Image as VanImage,
  Icon as VanIcon,
  Grid as VanGrid,
  GridItem as VanGridItem
} from 'vant'
import { getUserInfo } from '@/services/user'
import LayoutFooter from '@/components/layoutfooter'
export default {
  name: 'user',
  components: {
    LayoutFooter,
    VanCell,
    VanCellGroup,
    VanImage,
    VanIcon,
    VanGrid,
    VanGridItem
  },
  data () {
    return {
      userDatas: []
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      // console.log(data)
      this.userDatas = data.content
    }
  }
}

</script>
<style  lang='scss' scoped>
  .van-image{
    width: 60px;
    height: 60px;
  }
  .info{
    background-color: rgb(240, 170, 120);
  }
  .info .van-cell__value{
    margin: 20px 10px 0;
    display: flex;
    .user-info{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      h3{
        margin: 0;
        font-size: 18px;
      }
      span{
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
  .grid{
    background-color: rgb(240, 170, 120);
  }
  .grid .van-cell__value{
    margin-top: -1px;
  }
  .van-grid{
      border-radius: 10px;
      overflow: hidden;
      .grid-top{
        font-size: 22px;
        font-weight: 700;
        padding-bottom: 5px;
      }
  }
</style>
