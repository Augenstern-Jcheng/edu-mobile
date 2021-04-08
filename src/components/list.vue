<template>
<div class='list'>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      @load="onLoad"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell
        v-for="item in listDatas"
        :key="item.id"
        @click="$router.push({
          name: 'CourseInfo',
          params: {
            courseId: item.id
          }
        })"
        >
        <div class="left-img">
          <img :src="item.courseImgUrl || item.image">
        </div>
        <div class="right-text">
          <h3 v-text="item.courseName || item.name"></h3>
          <p class="preview" v-html="item.previewFirstField"></p>
          <p v-if="item.price">
            <span class="discounts">￥{{ item.discounts }}</span>
            <s>￥{{ item.price }}</s>
          </p>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import { Cell as VanCell, PullRefresh as VanPullRefresh, List as VanList, Toast } from 'vant'
export default {
  name: 'List',
  components: {
    VanCell,
    VanPullRefresh,
    VanList
  },
  props: {
    feachData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      listDatas: [],
      listForm: {
        currentPage: 1,
        pageSize: 10,
        status: 1
      }
    }
  },
  created () {
    this.onLoad()
    // console.log(this.$route)
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      this.finished = false
      this.listForm.currentPage = 1
      const { data } = await this.feachData(this.listForm)
      if (data.data && data.data.records) {
        this.listDatas = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.listDatas = data.content
      }
      this.listForm.currentPage++
      this.refreshing = false
      Toast.success('刷新成功')
    },
    // 底部刷新
    async onLoad () {
      const { data } = await this.feachData(this.listForm)
      // console.log(data)
      if (data.data && data.data.records) {
        this.listDatas.push(...data.data.records)
        this.listForm.currentPage++
      } else if (data.content && data.content.length !== 0) {
        this.listDatas.push(...data.content)
      }
      this.loading = false
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    }
  }
}

</script>
<style  lang='scss' scoped>
  .list {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    .van-cell__value{
      display: flex;
      height: 150px;
      width: 100%;
      .left-img{
        height: 150px;
        width: 30%;
        img{
          width: 100%;
          height: 150px;
        }
      }
      .right-text{
        display: flex;
        width: 70%;
        flex-direction: column;
        margin-left: 10px;
        h3,p,span{
          margin: 0;
          padding: 0;
        }
        .preview{
          flex: 1;
        }
        .discounts{
          padding-right: 5px;
          color: rgb(190, 86, 25);
        }

      }
    }
  }
</style>
