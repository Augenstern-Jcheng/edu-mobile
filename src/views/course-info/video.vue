<template>
<div class='lesson-video'>
  <van-nav-bar
    title="视频"
    left-text="返回"
    left-arrow
    @click-left="$router.go(-1)"
  />
  <div class="playVideoContainer">
    <div id="playVideo"></div>
  </div>
</div>
</template>

<script>
import { NavBar as VanNavBar } from 'vant'
import { getVideoPlayInfo } from '@/services/course'
export default {
  name: 'LessonVideo',
  props: {
    lessonId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    VanNavBar
  },
  data () {
    return {
      player: ''
    }
  },
  created () {
    this.loadVideoPlayInfo()
  },
  methods: {
    async loadVideoPlayInfo () {
      const { data } = await getVideoPlayInfo(this.lessonId)
      console.log(data)
      // 初始化播放器
      this.player = new window.Aliplayer({
        // 视频容器 ID
        id: 'playVideo',
        // 视频 ID
        vid: data.content.fileId,
        // 播放凭证
        playauth: data.content.playAuth,
        qualitySort: 'asc',
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        // 高度调整
        height: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      }, function (player) {
        // 成功的回调
        console.log('The player is created')
      })
    }
  }
}

</script>
<style  lang='scss' scoped>
.playVideoContainer{
  width: 100%;
  height: 300px;
}
</style>
