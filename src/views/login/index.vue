<template>
<div class='login'>
  <van-nav-bar
    title="Login"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-field
      v-model="loginForm.phone"
      name="phone"
      label="手机号"
      placeholder="请输入手机号"
      :rules="[
                {
                  required: true,
                  message: '请填写手机号'
                },
                {
                  validator: phoneVal,
                  message: '格式有误，请输入正确格式手机号'
                }
              ]"
    />
    <van-field
      v-model="loginForm.password"
      type="password"
      name="password"
      label="密码"
      placeholder="请输入密码"
      :rules="[
                {
                  required: true,
                  message: '请填写密码'
                },
                {
                  pattern: /^\w{6,12}$/,
                  message: '格式有误，密码长度6~12字符'
                }
              ]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" :loading="isloading">提交</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import { Button as VanButton, NavBar as VanNavBar, Form as VanForm, Field as VanField, Toast } from 'vant'
import { login } from '@/services/user'
export default {
  name: 'login',
  components: {
    VanNavBar,
    VanForm,
    VanField,
    VanButton
  },
  data () {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      isloading: false
    }
  },
  methods: {
    // 登录
    async onSubmit () {
      this.isloading = true
      const { data } = await login(this.loginForm)
      // console.log(data)
      if (data.success) {
        Toast.success('登录成功')
        this.$store.commit('setUser', data.content)
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        Toast.fail('手机号或密码错误')
      }
      this.isloading = false
    },
    // Phone校验
    phoneVal (val) {
      return /^1\d{10}$/.test(val)
    },
    // 返回按钮
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}

</script>
<style  lang='scss' scoped></style>
