export const NEWS_PAGE_SIZE = 10
export const HOME_NEWS_LIMIT = 6

export const newsItems = [
  {
    id: 'partner-day-2026',
    date: '2026.06.02',
    title: '看见你，照亮我们 | 中堂首届同伴关系日，我们把“朋友”两个字重新讲了一遍',
    summary: '同伴关系日以真实表达和彼此看见为主题，引导学生重新理解朋友、陪伴与共同成长。',
    image: '/static/image/news/news-1.jpg',
    category: '校园动态',
    source: 'wechat',
    href: 'https://mp.weixin.qq.com/s/H-bxlyXAr-a5wuZZiHl6ZA'
  },
  {
    id: 'micro-lesson-2026',
    date: '2026.05.29',
    title: '中堂微品课 | 撤出“标准答案”，三顾“高阶思维”',
    summary: '课堂从标准答案中后退一步，让学生在追问、辨析和迁移中抵达更高阶的思维。',
    image: '/static/image/news/news-2.jpg',
    category: '课程故事',
    source: 'wechat',
    href: 'https://mp.weixin.qq.com/s/BkBtGYD_k_UgTo6a1mURIQ'
  },
  {
    id: 'robot-growth-2026',
    date: '2026.05.28',
    title: '趣荟中堂 | 从赛场到成长：两位堂主的机器人进阶之路',
    summary: '两位学生讲述机器人学习与竞赛经历，呈现兴趣、技术和坚持如何互相点亮。',
    image: '/static/image/news/news-3.jpg',
    category: '学生成长',
    source: 'wechat',
    href: 'https://mp.weixin.qq.com/s/bIHkuhRoYThBGO5nfvDgPA'
  },
  {
    id: 'project-display-2026',
    date: '2026.05.25',
    title: '『青衿启志 蓄智待发』“展示”是学习的一种高阶样态——为何说“无展示、不项目”？',
    summary: '从项目学习的展示环节出发，讨论展示如何推动学生完成表达、反思和深度建构。',
    image: '/static/image/news/news-4.jpg',
    category: '学习方式',
    source: 'wechat',
    href: 'https://mp.weixin.qq.com/s/rwGAl3LDtpRah1oOPlvQ3A'
  },
  {
    id: 'graduation-uniform-signup',
    date: '2026.05.19',
    title: '趣荟中堂 | 毕业礼服设计小队等你来',
    summary: '面向学生招募毕业礼服设计小队，把创意、审美和校园仪式感变成真实作品。',
    image: '/static/image/news/news-5.jpg',
    category: '活动报名',
    source: 'signup',
    to: '/signup',
    query: { activity: '毕业礼服设计小队招募' }
  },
  {
    id: 'graduation-uniform-wechat',
    date: '2026.05.19',
    title: '毕业礼服设计小队报名原文',
    summary: '查看公众号原文，了解毕业礼服设计小队的招募要求与参与方式。',
    image: '/static/image/news/news-5.jpg',
    category: '活动原文',
    source: 'wechat',
    href: 'https://mp.weixin.qq.com/s/j1na8qQk0O9mSDRSROvBmA'
  },
  {
    id: 'learning-community-journey',
    slug: 'learning-community-journey',
    date: '2026.05.12',
    title: '学习社区建设之旅：让校园成为成长的资源载体',
    summary: '围绕语言表达、人文社会、科学技术、体育健康和综合实践等学习社区，打开真实而丰富的学习现场。',
    image: '/static/image/school/hall.jpg',
    category: '站内新闻',
    source: 'internal',
    body: [
      '中堂实验学校正在把校园空间、课程项目和学生真实生活连接起来，让学习不只发生在课堂，也发生在每一次讨论、展示、协作和复盘之中。',
      '学习社区的建设强调可选择、可实践、可分享。学生在不同空间中遇见资源、提出问题、形成作品，并在真实反馈中持续修正自己的理解。',
      '未来，网站新闻中心会持续收录学校自发新闻、公众号文章、活动报名入口和重要通知，方便师生、家长与社会公众集中了解学校动态。'
    ]
  }
]

function dateValue(item) {
  return Number(item.date.replaceAll('.', ''))
}

export const sortedNewsItems = [...newsItems].sort((a, b) => dateValue(b) - dateValue(a))
export const homeNewsItems = sortedNewsItems.slice(0, HOME_NEWS_LIMIT)

export function getNewsBadge(item) {
  if (item.source === 'signup') return '活动报名'
  if (item.source === 'wechat') return '公众号原文'
  return item.category || '站内新闻'
}

export function getNewsLinkTag(item) {
  return item.href ? 'a' : 'RouterLink'
}

export function getNewsLinkProps(item) {
  if (item.href) {
    return {
      href: item.href,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }

  if (item.source === 'signup') {
    return {
      to: item.query ? { path: item.to, query: item.query } : item.to
    }
  }

  return {
    to: { name: 'news-detail', params: { slug: item.slug || item.id } }
  }
}

export function findInternalNews(slug) {
  return sortedNewsItems.find((item) => (item.slug || item.id) === slug && item.source === 'internal')
}
