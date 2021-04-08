<template>
<div class='section-info'>
  <van-cell :border="false" class="sectionName" :title="sectionDatas.sectionName"/>
  <van-cell-group>
    <van-cell
      v-for="item in sectionDatas.courseLessons"
      :key="item.id"
      :title="item.theme"
      :border="false"
      @click="handleClick(item)"
      >
        <template #right-icon>
          <van-icon :name="item.canPlay ? 'play-circle' : 'lock'" class="search-icon" />
        </template>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
import { Cell as VanCell, CellGroup as VanCellGroup, Icon as VanIcon } from 'vant'
export default {
  name: 'sectionDatas',
  props: {
    sectionDatas: {
      type: Object,
      required: true
    }
  },
  components: {
    VanCell,
    VanCellGroup,
    VanIcon
  },
  methods: {
    handleClick (item) {
      if (item.canPlay) {
        this.$router.push({
          name: 'LessonVideo',
          params: {
            lessonId: item.id
          }
        })
      }
    }
  }
}

</script>
<style  lang='scss' scoped>
.sectionName{
  font-size: 20px;
  color: rgb(34, 33, 33);
  font-weight: bold;
}
</style>
