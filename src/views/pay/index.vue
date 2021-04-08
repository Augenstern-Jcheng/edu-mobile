<template>
<div class='pay'>
  <van-cell-group>
    <van-cell class="courser-info">
      <img :src="courseDatas.courseImgUrl">
      <div class="describe">
        <span class="courseName" v-text="courseDatas.courseName"></span>
        <span>￥{{ courseDatas.discounts }}</span>
      </div>
    </van-cell>
    <van-cell class="pay-info">
      <p>购买信息</p>
      <p>购买课程后使用此账号登录【拉钩】教育学习课程</p>
      <p>当前账号：{{ setPhone }}</p>
    </van-cell>
    <van-cell class="courser-pay">
      <div class="pay-way">
        <span>支付方式</span>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell @click="radio = '1'" class="pay-content">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png" alt="">
                  <span>微信支付</span>
                </template>
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell @click="radio = '2'" class="pay-content">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png" alt="">
                  <span>微信支付</span>
                </template>
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <van-button @click="handlePay">￥{{ courseDatas.discounts }}立即支付</van-button>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
import { Cell as VanCell, CellGroup as VanCellGroup, RadioGroup as VanRadioGroup, Radio as VanRadio, Button as VanButton } from 'vant'
import { getCourseInfoById } from '@/services/course'
import { createCourseOrder, createPayOrder, getPayResult } from '@/services/pay'
export default {
  name: 'pay',
  components: {
    VanCell,
    VanCellGroup,
    VanRadioGroup,
    VanRadio,
    VanButton
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true,
      // 订单号
      courseOrderNo: null,
      // 支付订单号
      payOrderNo: null
    }
  },
  data () {
    return {
      courseDatas: [],
      radio: '1'
    }
  },
  created () {
    this.loadCourseInfoById()
  },
  methods: {
    // 进行支付
    async handlePay () {
      const { data } = await createCourseOrder({
        goodsId: this.courseId
      })
      this.courseOrderNo = data.content.orderNo
      // console.log(data)
      const { data: payData } = await createPayOrder({
        goodsOrderNo: this.courseOrderNo,
        channel: this.radio === '1' ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.lagou.com'
      })
      // console.log(payData)
      // 跳转支付界面
      window.location.href = payData.content.payUrl
      this.payOrderNo = payData.content.orderNo
      const timer = setInterval(async () => {
        // 查看支付结果
        const { data: callbackData } = await getPayResult(this.payOrderNo)
        // console.log(callbackData)
        if (callbackData.content.status === 2) {
          clearInterval(timer)
          this.$router.push({
            name: 'learn'
          })
        }
      }, 3000)
    },
    // 获取课程xiangq
    async loadCourseInfoById () {
      const { data } = await getCourseInfoById(this.courseId)
      this.courseDatas = data.content
    }
  },
  computed: {
    setPhone () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}

</script>
<style  lang='scss' scoped>
  .pay{
    position: absolute;
    width: 100%;
    height: 100%;
    .van-cell-group{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .courser-info.van-cell {
        width: 100%;
        padding: 20px;
        ::v-deep .van-cell__value{
          display: flex;
          height: 107px;
          img{
            width: 80px;
            height: 107px;
            border-radius: 10px;
          }
          .describe{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20px;
            span:nth-child(1){
              color:rgb(34, 33, 33);
              font-size: 18px;
            }
            span:nth-child(2){
              color:rgb(252, 95, 74);
              font-size: 22px;
            }
          }
        }
      }
      .pay-info.van-cell{
        width: 100%;
        ::v-deep .van-cell__value{
          height: 130px;
          p{
            margin: 0 5px;
          }
          p:nth-child(1){
          font-size: 14px;
        }
          p:nth-child(2){
          font-size: 12px;
          color: rgb(117, 115, 115);
          padding-bottom: 10px;
        }
          p:nth-child(3){
          font-size: 16px;
          padding: 10px 0;
        }
        }
      }
      .courser-pay.van-cell{
        flex: 1;
        ::v-deep .van-cell__value{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .pay-way{
            .pay-content.van-cell{
              .van-cell__title{
                display: flex;
                align-items: center;
                margin: 5px 0;
                img{
                  width: 30px;
                  height: 30px;
                }
              }
            }
          }
          .van-button{
            background: linear-gradient(270deg, rgb(243, 104, 24), rgb(245, 201, 152));
            border-radius: 20px;
          }
        }
      }
    }
  }
</style>
