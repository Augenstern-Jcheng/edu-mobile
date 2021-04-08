<template>
<div class='course'>
  <course-header></course-header>
  <course-content></course-content>
  <layout-footer></layout-footer>
</div>
</template>

<script>
import LayoutFooter from '@/components/layoutfooter.vue'
import CourseContent from './components/courseContent'
import CourseHeader from './components/courseHeader'
export default {
  components: {
    LayoutFooter,
    CourseContent,
    CourseHeader
  },
  name: 'course'
}

</script>
<style  lang='scss' scoped></style>
