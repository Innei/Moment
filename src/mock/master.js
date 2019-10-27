const Mock = require('mockjs')

Mock.mock(/\/master\/info/, 'get', {
  'username': 'Innei',
  'userId': "@id",
  'avatar': 'https://q1.qlogo.cn/g?b=qq&nk=1003521738&s=640',
  'nickname': 'Moment',
  'githubUrl': 'https://github.com/Innei'
})

Mock.mock(/\/master\/introduce/, 'get', {
  ok: 1,
  userId: '@id',
  introduce: '我是练习时长两年半的个人练习生, Innei',
  skill: {
    Java: '@integer(50,65)',
    JavaScript: '@integer(50,75)',
    Vue: '@integer(50,80)'
  }
})
