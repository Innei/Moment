const Mock = require('mockjs')

Mock.mock(/\/user\/introduce\/(\d+)/, 'get', {
  "ok": 1,
  "userId": "@id",
  "introduce": "我是练习时长两年半的个人练习生, 蔡训坤",
  "skill": {
    "Java": "@integer(0,100)",
    "JavaScript": "@integer(0,100)",
    "Vue": "@integer(0,100)"
  }
})