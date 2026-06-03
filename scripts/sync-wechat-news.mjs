const urls = [
  'https://mp.weixin.qq.com/s/H-bxlyXAr-a5wuZZiHl6ZA',
  'https://mp.weixin.qq.com/s/BkBtGYD_k_UgTo6a1mURIQ',
  'https://mp.weixin.qq.com/s/bIHkuhRoYThBGO5nfvDgPA',
  'https://mp.weixin.qq.com/s/rwGAl3LDtpRah1oOPlvQ3A',
  'https://mp.weixin.qq.com/s/j1na8qQk0O9mSDRSROvBmA'
]

function formatDate(timestamp) {
  const date = new Date(Number(timestamp) * 1000)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

function readMeta(html) {
  const title = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1]
    || html.match(/var\s+msg_title\s*=\s*"([^"]+)"/)?.[1]
    || html.match(/var\s+msg_title\s*=\s*'([^']+)'/)?.[1]
    || ''
  const ct = html.match(/var\s+ct\s*=\s*"(\d{10})"/)?.[1]
    || html.match(/ct\s*:\s*"?(\d{10})"?/)?.[1]

  return {
    date: ct ? formatDate(ct) : '',
    title: title.replaceAll('&quot;', '"').replaceAll('&amp;', '&')
  }
}

const rows = []

for (const url of urls) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
      'accept-language': 'zh-CN,zh;q=0.9'
    }
  })
  const html = await response.text()
  const meta = readMeta(html)
  rows.push({ ...meta, href: url })
}

console.log(JSON.stringify(rows, null, 2))
