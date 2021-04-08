import request from '@/utils/request'
// 获取轮播数据
export function getAllAds (spaceKeys) {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params: {
      spaceKeys
    }
  })
}
// 获取课程信息
export function getQueryCourses (data) {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
// 获取已购信息
export function getPurchaseCourse () {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse'
  })
}
// 获取课程详情
export function getCourseInfoById (courseId) {
  return request({
    method: 'GET',
    url: '/front/course/getCourseById',
    params: {
      courseId
    }
  })
}
// 获取课程章节信息
export function getSectionAndLesson (courseId) {
  return request({
    method: 'GET',
    url: '/front/course/session/getSectionAndLesson',
    params: {
      courseId
    }
  })
}
// 获取视频凭证
export function getVideoPlayInfo (lessonId) {
  return request({
    method: 'GET',
    url: '/front/course/media/videoPlayInfo',
    params: {
      lessonId
    }
  })
}
