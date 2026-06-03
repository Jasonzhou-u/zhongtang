export const platformLinks = [
  { label: '我是学生', href: '#student-platform' },
  { label: '我是老师', href: '#teacher-platform' }
]

export const navItems = [
  { label: '首页', to: '/' },
  { label: '中堂简介', to: '/about' },
  { label: '成长合伙人', to: '/partners' },
  { label: '活动直通车', to: '/events' },
  { label: '堂中雅景', to: '/views' },
  { label: '名人堂', to: '/hall' },
  { label: '报名后台', to: '/admin' }
]

export const heroSlides = [
  {
    image: '/static/image/school/hall.jpg',
    eyebrow: '为学习者而存在',
    title: '在中堂，遇见更辽阔的成长',
    summary: '把校园建设成学生主动学习、真实表达和持续创造的成长现场。',
    link: '/about',
    linkText: '了解学校'
  },
  {
    image: '/static/image/school/corridor.jpg',
    eyebrow: '开放、真实、热烈',
    title: '让每一次奔跑都通向自我发现',
    summary: '课程、社群、活动共同组成可选择、可实践、可分享的校园生活。',
    link: '/events',
    linkText: '查看活动'
  },
  {
    image: '/static/image/school/soho.jpg',
    eyebrow: '学习发生在每一个角落',
    title: '把校园变成学生主动创造的场域',
    summary: '从青蹊 Soho 到造物局，从教室到公共空间，学习随处发生。',
    link: '/views',
    linkText: '漫游校园'
  }
]

export const newsItems = [
  {
    date: '2026.06.02',
    title: '看见你，照亮我们 | 中堂首届同伴关系日，我们把“朋友”两个字重新讲了一遍',
    summary: '同伴关系日以真实表达和彼此看见为主题，引导学生重新理解朋友、陪伴与共同成长。',
    image: '/static/image/news/news-1.jpg',
    href: 'https://mp.weixin.qq.com/s/H-bxlyXAr-a5wuZZiHl6ZA'
  },
  {
    date: '2026.05.29',
    title: '中堂微品课 | 撤出“标准答案”，三顾“高阶思维”',
    summary: '课堂从标准答案中后退一步，让学生在追问、辨析和迁移中抵达更高阶的思维。',
    image: '/static/image/news/news-2.jpg',
    href: 'https://mp.weixin.qq.com/s/BkBtGYD_k_UgTo6a1mURIQ'
  },
  {
    date: '2026.05.28',
    title: '趣荟中堂 | 从赛场到成长：两位堂主的机器人进阶之路',
    summary: '两位学生讲述机器人学习与竞赛经历，呈现兴趣、技术和坚持如何互相点亮。',
    image: '/static/image/news/news-3.jpg',
    href: 'https://mp.weixin.qq.com/s/bIHkuhRoYThBGO5nfvDgPA'
  },
  {
    date: '2026.05.25',
    title: '『青衿启志 蓄智待发』“展示”是学习的一种高阶样态——为何说“无展示、不项目”？',
    summary: '从项目学习的展示环节出发，讨论展示如何推动学生完成表达、反思和深度建构。',
    image: '/static/image/news/news-4.jpg',
    href: 'https://mp.weixin.qq.com/s/rwGAl3LDtpRah1oOPlvQ3A'
  },
  {
    date: '2026.05.19',
    title: '趣荟中堂 | 毕业礼服设计小队等你来',
    summary: '面向学生招募毕业礼服设计小队，把创意、审美和校园仪式感变成真实作品。',
    image: '/static/image/news/news-5.jpg',
    to: '/signup',
    query: { activity: '毕业礼服设计小队招募' },
    type: 'signup'
  },
  {
    date: '2026.05.19',
    title: '毕业礼服设计小队报名原文',
    summary: '查看公众号原文，了解毕业礼服设计小队的招募要求与参与方式。',
    image: '/static/image/news/news-5.jpg',
    href: 'https://mp.weixin.qq.com/s/j1na8qQk0O9mSDRSROvBmA',
    type: 'activity'
  }
]

export const openActivities = [
  {
    id: 'wechat-latest-signup',
    date: '2026.05.19',
    title: '毕业礼服设计小队招募',
    summary: '来自学校公众号“趣荟中堂 | 毕业礼服设计小队等你来”的活动报名入口，请填写学生信息，后台会同步保存报名记录。',
    image: '/static/image/school/corridor.jpg'
  },
  {
    id: 'campus-expression',
    date: '2026.03.30',
    title: '此时此地：校园表达展演',
    summary: '面向七至九年级学生开放，包含作品展示、现场分享与互动体验。',
    image: '/static/image/school/shenghua.jpg'
  },
  {
    id: 'maker-open-day',
    date: '2026.04.12',
    title: '造物局开放日',
    summary: '从真实问题出发，完成一个可以展示、可以分享的小作品。',
    image: '/static/image/school/classroom.jpg'
  },
  {
    id: 'sports-volunteer',
    date: '2026.04.20',
    title: '校园运动季志愿者招募',
    summary: '招募活动主持、秩序维护、摄影记录和后勤支持志愿者。',
    image: '/static/image/school/gym.jpg'
  }
]

export const pastActivities = [
  { date: '2026.03.18', title: '学生原创作品开放展', summary: '在美术馆空间集中呈现学生绘画、装置与影像作品，让表达被更多人看见。', image: '/static/image/school/gallery.jpg', to: '/views' },
  { date: '2026.03.05', title: '中糖咖啡屋圆桌分享', summary: '学生、导师与家长围坐交流学习社区建设中的真实体验和成长故事。', image: '/static/image/school/cafe.jpg', to: '/partners' },
  { date: '2026.02.26', title: '研究性课程成果汇报', summary: '围绕真实问题开展小组研究，学生以展板、演示和答辩完成学习成果发布。', image: '/static/image/school/classroom.jpg', to: '/about' },
  { date: '2026.01.16', title: '学习社区开放走读', summary: '走进青蹊 Soho、学科教室与公共空间，观察学习如何在校园各处自然发生。', image: '/static/image/school/soho.jpg', to: '/views' },
  { date: '2025.12.20', title: '体育健康嘉年华', summary: '以运动挑战、团队协作和健康知识闯关，记录学生在身体与意志上的成长。', image: '/static/image/school/gym.jpg', to: '/views' }
]

export const campusViews = [
  { title: '北大厅', image: '/static/image/school/hall.jpg', summary: '开放明亮的公共空间，是展览、交流和每日相遇的起点。', wide: true },
  { title: '青蹊 Soho', image: '/static/image/school/soho.jpg', summary: '学生自主讨论、项目推进和灵感碰撞的社区空间。' },
  { title: '中糖咖啡屋', image: '/static/image/school/cafe.jpg', summary: '圆桌分享、家校交流和轻松对话在这里自然发生。' },
  { title: '美术馆', image: '/static/image/school/gallery.jpg', summary: '让作品被看见，也让审美与表达进入日常。' },
  { title: '学科教室', image: '/static/image/school/classroom.jpg', summary: '支持研究、讨论、展示和跨学科学习的真实场域。' },
  { title: '体育馆', image: '/static/image/school/gym.jpg', summary: '在运动中建立团队意识、体能基础与坚韧品格。' }
]

export const heartPhotos = [
  '/static/image/school/campus-overview.jpg',
  '/static/image/school/classroom.jpg',
  '/static/image/school/soho.jpg',
  '/static/image/school/cafe.jpg',
  '/static/image/school/gallery.jpg',
  '/static/image/school/hall.jpg',
  '/static/image/school/gym.jpg',
  '/static/image/school/shenghua.jpg',
  '/static/image/school/corridor.jpg',
  '/static/image/操场.jpg',
  '/static/image/北大厅-为学习者而存在.JPG',
  '/static/image/青溪Soho.jpg',
  '/static/image/school/campus-overview.jpg',
  '/static/image/school/classroom.jpg',
  '/static/image/school/soho.jpg',
  '/static/image/school/cafe.jpg',
  '/static/image/school/gallery.jpg',
  '/static/image/school/hall.jpg',
  '/static/image/school/gym.jpg',
  '/static/image/school/shenghua.jpg',
  '/static/image/school/corridor.jpg',
  '/static/image/操场.jpg',
  '/static/image/北大厅-为学习者而存在.JPG',
  '/static/image/青溪Soho.jpg',
  '/static/image/school/campus-overview.jpg',
  '/static/image/school/classroom.jpg',
  '/static/image/school/soho.jpg',
  '/static/image/school/cafe.jpg',
  '/static/image/school/gallery.jpg'
]
