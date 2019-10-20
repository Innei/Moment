const Mock = require('mockjs')

Mock.mock(/\/moment/, 'get', {
      "ok": 1,
      "size": 10,
      "page": 1,
      "data": [
        {
          "_id": "@id",
          "createdTime": 1571299457065,
          "modifiedTime": 1571299777065,
          "type": "moment",
          "content": {
            "title": "这是一条瞬间",
            "body": "今天的天气真好",
            "mood": "开心",
            "weather": "Sunny"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1571299457065,
          "modifiedTime": 1571299457065,
          "type": "hitokoto",
          "content": {
            "source": "yiny",
            "body": "今天的天气真好"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1571299457065,
          "modifiedTime": 1571299777065,
          "type": "idea",
          "content": {
            "body": "今天的天气真好"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1571299457065,
          "modifiedTime": 1571299777065,
          "type": "picture",
          "content": {
            "src": "https://i.loli.net/2019/08/18/vGNB4oOepVA6lPQ.jpg"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1571199457065,
          "modifiedTime": 1571299777065,
          "type": "moment",
          "content": {
            "title": "这是一条瞬间",
            "body": "今天的天气真好",
            "mood": "开心"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1571099457065,
          "modifiedTime": 1571399777065,
          "type": "hitokoto",
          "content": {
            "source": "yiny",
            "body": "今天的天气真好"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1570999457065,
          "modifiedTime": 1571299777065,
          "type": "idea",
          "content": {
            "body": "今天的天气真好"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1570899457065,
          "modifiedTime": 1571299777065,
          "type": "picture",
          "content": {
            "src": "https://i.loli.net/2019/08/18/vGNB4oOepVA6lPQ.jpg"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1570699457065,
          "modifiedTime": 1571299777065,
          "type": "idea",
          "content": {
            "body": "今天的天气真好"
          }
        },
        {
          "_id": "@id",
          "createdTime": 1570499457065,
          "modifiedTime": 1571299777065,
          "type": "picture",
          "content": {
            "src": "https://i.loli.net/2019/08/18/vGNB4oOepVA6lPQ.jpg",
            "comment": "好漂亮啊！！！！"
          }
        }
      ]
    }
)