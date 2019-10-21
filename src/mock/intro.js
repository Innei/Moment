const Mock = require('mockjs')

Mock.mock(/\/user\/introduce\/(\d+)/, 'get', {
  ok: 1,
  userId: '@id',
  introduce: '我是练习时长两年半的个人练习生, Innei',
  skill: {
    Java: '@integer(50,60)',
    JavaScript: '@integer(50,60)',
    Vue: '@integer(50,60)'
  }
})
