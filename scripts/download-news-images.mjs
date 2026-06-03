const images = [
  {
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/FuWK12os41cKqxRPQAxicibiaal8z2nxqrT2dlkazqejGvIt1FJr6YJjRcA3HziaC8oXgib9Xg0riaWkU2ib1z8dK1O6Ev7WSMkSIQvreiarZ9LCONU/0?wx_fmt=jpeg',
    file: 'public/static/image/news/news-1.jpg'
  },
  {
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/FuWK12os41dtf9uynX2dbUs7WjaNH3Wux0DgRmrHwSSHke3ic0LsTnm4gKDwCbMpaxTzsRBzkSFjwrXAPaPOLTues0Diahkgav4KDyYERWFu0/0?wx_fmt=jpeg',
    file: 'public/static/image/news/news-2.jpg'
  },
  {
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/FuWK12os41dQwyZsKTgCpOP17KSBXGzHgCHGCTVqEicX2vw25dn98jiaSKavfRDqXNLNBs34aUyblZk38NBMOTT9mWTYDQd1w7k9uKSWKUWao/0?wx_fmt=jpeg',
    file: 'public/static/image/news/news-3.jpg'
  },
  {
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/FuWK12os41eu3uFuAAStvqDhzEUFZ81t6pYeeNyRyEceYNb52JUSfVFezl0awLN5ibibVZT2IqL2AFdsDN591lBlPfmcGtL8yc8Ugfzgsc7I8/0?wx_fmt=jpeg',
    file: 'public/static/image/news/news-4.jpg'
  },
  {
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/FuWK12os41eVoJBd869Aj6Rwdo2aLdp2lcYFaDp47bzBEL7k5pzZTmmCmuL9H0LHeicbLGoTA9SHIG1icJN6Lvj9zyMNcMFO1C1Ob6PDRvN5Q/0?wx_fmt=jpeg',
    file: 'public/static/image/news/news-5.jpg'
  }
]

for (const item of images) {
  const response = await fetch(item.url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
      referer: 'https://mp.weixin.qq.com/'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to download ${item.url}: ${response.status}`)
  }

  const bytes = Buffer.from(await response.arrayBuffer())
  await import('node:fs/promises').then((fs) => fs.writeFile(item.file, bytes))
  console.log(`${item.file} ${bytes.length} bytes`)
}
