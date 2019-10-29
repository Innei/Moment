# 一瞬, 记录生活美好瞬间

一瞬 (Moment), 是我接下来要做的一个项目，目的显而易见，就是希望它能够记录下生活中的美好瞬间。

这个项目是一个未成品，它仅仅是一个前端，所有的数据全部来自于 Mock.js 的接口模拟。但是它将作为一瞬的前端。

后端即将开始开发。

preview:

![](https://raw.githubusercontent.com/Innei/img-bed/master/20191020211642.png)

Demo 地址:

[Moment](https://preview.shizuri.net/moment)

## 快速开始

即刻构建此项目，你只需要

```bash
git clone https://github.com/Innei/moment.git
cd moment
yarn
yarn serve
```

打开访问 `http://localhost:8080`

## 接口格式

所有接口格式位于 `mock` 目录中，更为详细的 `json` 位于 `@api`

<span style="color=red">接口格式可能有更新!!</span>

所有接口前缀统一为 `api`, 接口地址为 `api/` 加上 `baseUrl`

### 获取主人信息

基本信息:

baseUrl: `/master`

```jsonc
// get /
{
  "username": "Innei", // 主人名
  "userId": "1", // id
  "avatar": "http://q1.qlogo.cn/g?b=qq&nk=1003521738&s=640", // 头像地址
  "nickname": "Moment", // 别名
  "githubUrl": "https://github.com/Innei" // 可选 GitHub 地址
}
```

首页介绍:

```jsonc
// get /introduce
{
  "ok": 1, // 状态
  "userId": 1, // uid
  "introduce": "我是一个练习时长两年半的个人练习生, xxx", // 介绍
  "skill": { // 技能树 (0 - 100)
    "Java": 70,
    "JavaScript": 50,
    "Vue": 90
  }
}
```

### 获取瞬间列表

baseUrl: `/moments`

请求方式为 `GET`

携带参数可选 `size` `page`

```jsonc
{
  "ok": 1,                               // 状态
  "pageOptions": {
    "size": 10,                          // 页大小
    "currentPage": 1,                    // 当前页
    "totalPage": 1,                      // 总页
    "hasNextPage": false,                // 是否有下一页
    "hasPrevPage": false,                // 是否有上一页
  },
  "data": [ // 数据
    {
      "_id": 1, // MongoDB objectID 或者 其他 ID
      "createdTime": 1571299457065, // 13位时间截 创建时间
      "modifiedTime": 1571299777065,
      "type": "moment", // 类型 moment picture idea hitokoto 4选1, content 有所不同
      "content": {
        "title": "这是一条瞬间", 
        "body": "今天的天气真好",
        "mood": "开心",
        "weather": "Sunny"
      }
    },
    {
      "_id": 2,
      "createdTime": 1571399457065,
      "modifiedTime": 1571399777065,
      "type": "hitokoto",
      "content": {
        "source": "yiny",
        "body": "今天的天气真好"
      }
    },
    {
      "_id": 3,
      "createdTime": 1571299457065,
      "modifiedTime": 1571299777065,
      "type": "idea",
      "content": {
        "body": "今天的天气真好"
      }
    },
    {
      "_id": 4,
      "createdTime": 1571299457065,
      "modifiedTime": 1571299777065,
      "type": "picture",
      "content": {
        "src": "https://i.loli.net/2019/08/18/vGNB4oOepVA6lPQ.jpg"
      }
    }]
}

```

欢迎大佬们，能参与到一瞬的开发中去。
