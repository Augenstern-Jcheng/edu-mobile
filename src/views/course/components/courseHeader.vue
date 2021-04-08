<template>
<div class='course-header'>
  <van-image :src="require('@/assets/logo.png')">
  </van-image>
</div>
</template>

<script>
import { Image as VanImage } from 'vant'
export default {
  name: 'CourseHeader',
  components: {
    VanImage
  }
}

</script>
<style  lang='scss' scoped>
.van-image{
  height: 50px;
  display: flex;
  align-items: centenr;
  ::v-deep img{
    width: 180px;
    margin-left: -20px
  }
}
</style>
