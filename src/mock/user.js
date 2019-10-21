const Mock = require('mockjs')

Mock.mock(/\/user\/info\/(\d+)/, 'get', {
  'username': 'Innei',
  'userId': "@id",
  'avatar': 'https://q1.qlogo.cn/g?b=qq&nk=1003521738&s=640',
  'nickname': 'Moment',
  'githubUrl': 'https://github.com/Innei'
})