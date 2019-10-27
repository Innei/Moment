const Mock = require('mockjs')

Mock.mock(/\/moments/, 'get', {
  ok: 1,
  size: 10,
  page: 1,
  data: [
    {
      _id: '@id',
      createdTime: 1571299457065,
      modifiedTime: 1571299777065,
      type: 'moment',
      content: {
        title: '怎能甘于安于现状',
        body:
          '反正都这样了，我反正没希望了。\n这是现实大学生的真实写照。很多大学生，上了大学便开始放飞自我了，我相信也有很大一部分原因是高中老师告诉他们，你们上了大学就可以玩了，也对，我也是其中的一个受骗者。其实这句话也不完全错误。的确上了大学，没有人再来管你的学习了，除非你在第一学期挂了很多门课，当然老师都是很水的，真要想挂科还是挺难的。于是到了第二学期更加不思进取，感觉反正第一学期啥也没学期末也没挂科，无所谓了，到了最后可能连最水的考试你都要过不去了。于是开始了重修。这是一条不归路。\n当你真的想去后悔，想改过自新时，真的太难了。第一是，欠下的太多，不知道从何补起；第二是惰性，对游戏的牵挂。最后想想，还是算了，反正都这样了，我反正没希望了。相反，在游戏上，却不忍于落后，花费更多时间和精力去提升自己。\n大学生活在我看来，这是一个不同于其他学业阶段的一个重要时期，一是能认识到很多志同道合的人（虽然我还没遇到），二是参加很多活动开阔眼界认识更多的人（虽然我也没参加很多活动）（所以我觉得还是挺可惜的）。但是至少我没有整天在电脑面前玩游戏。上学期，我没有涉足游戏领域，而是给自己定了一个目标吧。自学前端也是从那时候开始的，4月头3月底，开始了前端自学的道路，一路还是挺磕磕碰碰的，暑假开始接触 Vue。现在是后端 Node，当然暑假的时候就已经开始接触后端了。我感觉我应该是一个不甘于现状的人，所以我才会想去接触一点未知的领域，好玩的东西，新的科技，很是能提起我的兴趣。\n在上学期，我有了明确的目标之后，对学业不那么重视了，但是到了最后居然绩点还提了几个小数点，有点意外。相反，提升带来喜悦，下降也会带来难受。所以在学期初的免修考试中，定下了史上最低分，导致下降了几个小数点的绩点后也是自闭了一周多的时间。虽然这好像也带来不了什么，但是一个人如果有了还算不错的东西，就会十分害怕失去他。这也好比把名利看得过于重了。\n学习是很重要，在目标没有明确之前，它会是我们未来一切的基础。但是，当你确定好自己的人生目标，你的选择、理想和自由，通通都会排在学习的前面。\n最后，计划一下接下来的日子，依旧不忘初心，朝着自己的目标前进。',
        mood: '寒',
        weather: '晴'
      }
    },
    {
      _id: '@id',
      createdTime: 1571299457065,
      modifiedTime: 1571299457065,
      type: 'hitokoto',
      content: {
        source: 'Hitokoto',
        body: '我们是如此的担心着未来会发生的事情，因此忘记了慢下来享受现在。'
      }
    },
    {
      _id: '@id',
      createdTime: 1571299457065,
      modifiedTime: 1571299777065,
      type: 'idea',
      content: {
        body: '这是一个想法'
      }
    },
    {
      _id: '@id',
      createdTime: 1571299457065,
      modifiedTime: 1571299777065,
      type: 'picture',
      content: {
        src: 'https://i.loli.net/2019/08/18/vGNB4oOepVA6lPQ.jpg',
        comment: '日本'
      }
    },
    {
      _id: '@id',
      createdTime: 1571199457065,
      modifiedTime: 1571299777065,
      type: 'moment',
      content: {
        title: '这是一条瞬间',
        body: '今天的天气真好',
        mood: '开心'
      }
    },
    {
      _id: '@id',
      createdTime: 1571099457065,
      modifiedTime: 1571399777065,
      type: 'hitokoto',
      content: {
        source: '有妹',
        body: '你们这些天才止步不前的时候，我会走得更远。'
      }
    },
    {
      _id: '@id',
      createdTime: 1570999457065,
      modifiedTime: 1571299777065,
      type: 'idea',
      content: {
        body: '好的想法'
      }
    },
    {
      _id: '@id',
      createdTime: 1570899457065,
      modifiedTime: 1571299777065,
      type: 'picture',
      content: {
        src: 'https://i.loli.net/2019/08/18/vGNB4oOepVA6lPQ.jpg',
        comment: '日本'
      }
    },
    {
      _id: '@id',
      createdTime: 1570699457065,
      modifiedTime: 1571299777065,
      type: 'idea',
      content: {
        body: '今天的天气真好'
      }
    },
    {
      _id: '@id',
      createdTime: 1570499457065,
      modifiedTime: 1571299777065,
      type: 'picture',
      content: {
        src: 'https://i.loli.net/2019/08/18/vGNB4oOepVA6lPQ.jpg',
        comment: '好漂亮啊！！！！'
      }
    }
  ]
})
