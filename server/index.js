import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import express from 'express'

import { campusSpaces } from '../src/data/campusSpaces.js'
import { newsItems } from '../src/data/newsData.js'
import { heroSlides, openActivities, pastActivities } from '../src/data/siteData.js'
import { teacherPhotos } from '../src/data/teacherData.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const port = Number(process.env.PORT || 5511)
const adminUsername = process.env.ADMIN_USERNAME || 'admin'
const adminPassword = process.env.ADMIN_PASSWORD || 'zt2026'
const sessionSecret = process.env.SESSION_SECRET || 'dev-secret-change-me'
const databasePath = path.resolve(rootDir, process.env.DATABASE_PATH || './data/registrations.json')
const contentPath = path.resolve(rootDir, process.env.CONTENT_PATH || './data/content.json')
const uploadDir = path.resolve(rootDir, './public/uploads')

fs.mkdirSync(path.dirname(databasePath), { recursive: true })
fs.mkdirSync(path.dirname(contentPath), { recursive: true })
fs.mkdirSync(uploadDir, { recursive: true })

function withContentMeta(items = []) {
  return items.map((item, index) => ({
    ...item,
    published: item.published !== false,
    order: Number.isFinite(item.order) ? item.order : index + 1
  }))
}

function defaultContent() {
  return {
    home: {
      heroSlides: withContentMeta(heroSlides)
    },
    news: withContentMeta(newsItems),
    activities: {
      open: withContentMeta(openActivities),
      past: withContentMeta(pastActivities)
    },
    spaces: withContentMeta(campusSpaces),
    teachers: withContentMeta(teacherPhotos),
    settings: {
      address: '北京市丰台区梅市口路2号院',
      postcode: '100161',
      email: 'bndszes@126.com',
      wechatQr: '/static/image/wechat-qr-cropped.png',
      icp: '京ICP备00000000号-1',
      police: '京公网安备 11000000000000号'
    }
  }
}

function normalizeContent(raw = {}) {
  const seed = defaultContent()
  return {
    home: {
      heroSlides: withContentMeta(raw.home?.heroSlides?.length ? raw.home.heroSlides : seed.home.heroSlides)
    },
    news: withContentMeta(raw.news?.length ? raw.news : seed.news),
    activities: {
      open: withContentMeta(raw.activities?.open?.length ? raw.activities.open : seed.activities.open),
      past: withContentMeta(raw.activities?.past?.length ? raw.activities.past : seed.activities.past)
    },
    spaces: withContentMeta(raw.spaces?.length ? raw.spaces : seed.spaces),
    teachers: withContentMeta(raw.teachers?.length ? raw.teachers : seed.teachers),
    settings: { ...seed.settings, ...(raw.settings || {}) }
  }
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch {
    return fallback
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
}

function readRegistrations() {
  const rows = readJson(databasePath, [])
  return Array.isArray(rows) ? rows : []
}

function writeRegistrations(rows) {
  writeJson(databasePath, rows)
}

function readContent() {
  const raw = readJson(contentPath, null)
  const content = normalizeContent(raw || defaultContent())
  if (!raw) writeContent(content)
  return content
}

function writeContent(content) {
  writeJson(contentPath, normalizeContent(content))
}

const app = express()
app.use(express.json({ limit: '12mb' }))
app.use('/uploads', express.static(uploadDir))

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const index = item.indexOf('=')
        return [decodeURIComponent(item.slice(0, index)), decodeURIComponent(item.slice(index + 1))]
      })
  )
}

function sign(value) {
  return crypto.createHmac('sha256', sessionSecret).update(value).digest('hex')
}

function createSessionCookie() {
  const payload = JSON.stringify({ username: adminUsername, issuedAt: Date.now() })
  const encoded = Buffer.from(payload).toString('base64url')
  return `${encoded}.${sign(encoded)}`
}

function isValidSession(req) {
  const cookies = parseCookies(req.headers.cookie)
  const session = cookies.zt_admin
  if (!session) return false

  const [encoded, signature] = session.split('.')
  if (!encoded || !signature || sign(encoded) !== signature) return false

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'))
    const age = Date.now() - Number(payload.issuedAt)
    return payload.username === adminUsername && age >= 0 && age < 1000 * 60 * 60 * 8
  } catch {
    return false
  }
}

function requireAdmin(req, res, next) {
  if (!isValidSession(req)) {
    res.status(401).json({ message: '请先登录管理员后台' })
    return
  }
  next()
}

function cleanString(value) {
  return String(value ?? '').trim()
}

function sortPublished(items = []) {
  return items
    .filter((item) => item.published !== false)
    .sort((a, b) => Number(a.order || 9999) - Number(b.order || 9999))
}

function sortNews(items = []) {
  return sortPublished(items).sort((a, b) => Number(String(b.date || '').replaceAll('.', '')) - Number(String(a.date || '').replaceAll('.', '')))
}

function getCollection(content, type) {
  const map = {
    news: content.news,
    openActivities: content.activities.open,
    pastActivities: content.activities.past,
    spaces: content.spaces,
    teachers: content.teachers,
    heroSlides: content.home.heroSlides
  }
  return map[type]
}

function setCollection(content, type, rows) {
  if (type === 'news') content.news = rows
  if (type === 'openActivities') content.activities.open = rows
  if (type === 'pastActivities') content.activities.past = rows
  if (type === 'spaces') content.spaces = rows
  if (type === 'teachers') content.teachers = rows
  if (type === 'heroSlides') content.home.heroSlides = rows
}

function ensureItem(raw, type) {
  const item = { ...raw }
  item.id = cleanString(item.id) || cleanString(item.slug) || crypto.randomUUID()
  if (type === 'spaces') item.slug = cleanString(item.slug) || item.id
  item.title = cleanString(item.title || item.name || '未命名内容')
  item.published = item.published !== false
  item.order = Number.isFinite(Number(item.order)) ? Number(item.order) : 999
  return item
}

app.get('/api/content/home', (_req, res) => {
  const content = readContent()
  res.json({
    heroSlides: sortPublished(content.home.heroSlides),
    settings: content.settings
  })
})

app.get('/api/content/news', (_req, res) => {
  const content = readContent()
  res.json({ news: sortNews(content.news) })
})

app.get('/api/content/activities', (_req, res) => {
  const content = readContent()
  res.json({
    open: sortPublished(content.activities.open),
    past: sortPublished(content.activities.past)
  })
})

app.get('/api/content/spaces', (_req, res) => {
  const content = readContent()
  res.json({ spaces: sortPublished(content.spaces) })
})

app.get('/api/content/teachers', (_req, res) => {
  const content = readContent()
  res.json({ teachers: sortPublished(content.teachers) })
})

app.get('/api/admin/content', requireAdmin, (_req, res) => {
  res.json({ content: readContent() })
})

app.put('/api/admin/content/settings', requireAdmin, (req, res) => {
  const content = readContent()
  content.settings = { ...content.settings, ...(req.body || {}) }
  writeContent(content)
  res.json({ ok: true, settings: content.settings })
})

app.post('/api/admin/content/:type', requireAdmin, (req, res) => {
  const content = readContent()
  const rows = getCollection(content, req.params.type)
  if (!rows) {
    res.status(404).json({ message: '内容类型不存在' })
    return
  }
  const item = ensureItem(req.body, req.params.type)
  rows.unshift(item)
  setCollection(content, req.params.type, rows)
  writeContent(content)
  res.status(201).json({ ok: true, item })
})

app.put('/api/admin/content/:type/:id', requireAdmin, (req, res) => {
  const content = readContent()
  const rows = getCollection(content, req.params.type)
  if (!rows) {
    res.status(404).json({ message: '内容类型不存在' })
    return
  }
  const index = rows.findIndex((item) => String(item.id || item.slug) === req.params.id)
  if (index === -1) {
    res.status(404).json({ message: '内容不存在' })
    return
  }
  const nextItem = ensureItem({ ...rows[index], ...req.body, id: rows[index].id }, req.params.type)
  rows.splice(index, 1, nextItem)
  setCollection(content, req.params.type, rows)
  writeContent(content)
  res.json({ ok: true, item: nextItem })
})

app.delete('/api/admin/content/:type/:id', requireAdmin, (req, res) => {
  const content = readContent()
  const rows = getCollection(content, req.params.type)
  if (!rows) {
    res.status(404).json({ message: '内容类型不存在' })
    return
  }
  setCollection(
    content,
    req.params.type,
    rows.filter((item) => String(item.id || item.slug) !== req.params.id)
  )
  writeContent(content)
  res.json({ ok: true })
})

app.post('/api/admin/upload', requireAdmin, (req, res) => {
  const dataUrl = cleanString(req.body.dataUrl)
  const originalName = cleanString(req.body.name || 'upload.png')
  const match = dataUrl.match(/^data:(image\/(?:png|jpe?g|webp|gif));base64,(.+)$/)
  if (!match) {
    res.status(400).json({ message: '请上传 png、jpg、webp 或 gif 图片' })
    return
  }

  const extMap = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' }
  const ext = extMap[match[1]] || path.extname(originalName).replace('.', '') || 'png'
  const filename = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`
  fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(match[2], 'base64'))
  res.status(201).json({ ok: true, url: `/uploads/${filename}` })
})

app.post('/api/registrations', (req, res) => {
  const activity = cleanString(req.body.activity)
  const name = cleanString(req.body.name)
  const className = cleanString(req.body.className)
  const phone = cleanString(req.body.phone)
  const note = cleanString(req.body.note)

  if (!activity || !name || !className || !phone) {
    res.status(400).json({ message: '请完整填写活动、姓名、班级和联系电话' })
    return
  }

  const registration = {
    id: crypto.randomUUID(),
    createdAt: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }),
    activity,
    name,
    className,
    phone,
    note
  }

  const registrations = readRegistrations()
  registrations.unshift(registration)
  writeRegistrations(registrations)

  res.status(201).json({ ok: true, registration: { id: registration.id } })
})

app.post('/api/admin/login', (req, res) => {
  const username = cleanString(req.body.username)
  const password = cleanString(req.body.password)

  if (username !== adminUsername || password !== adminPassword) {
    res.status(401).json({ message: '账号或密码不正确' })
    return
  }

  res.setHeader('Set-Cookie', `zt_admin=${createSessionCookie()}; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800`)
  res.json({ ok: true })
})

app.post('/api/admin/logout', (_req, res) => {
  res.setHeader('Set-Cookie', 'zt_admin=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0')
  res.json({ ok: true })
})

app.get('/api/admin/me', requireAdmin, (_req, res) => {
  res.json({ username: adminUsername })
})

app.get('/api/admin/registrations', requireAdmin, (_req, res) => {
  const registrations = readRegistrations()
  res.json({ registrations })
})

app.delete('/api/admin/registrations/:id', requireAdmin, (req, res) => {
  const registrations = readRegistrations().filter((item) => item.id !== req.params.id)
  writeRegistrations(registrations)
  res.json({ ok: true })
})

function escapeCsv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

app.get('/api/admin/registrations/export.csv', requireAdmin, (_req, res) => {
  const rows = readRegistrations()
  const header = ['提交时间', '活动', '姓名', '班级', '电话', '备注']
  const body = rows.map((row) => [row.createdAt, row.activity, row.name, row.className, row.phone, row.note].map(escapeCsv).join(','))
  const csv = [header.map(escapeCsv).join(','), ...body].join('\n')
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="registrations.csv"')
  res.send(`\uFEFF${csv}`)
})

const distDir = path.join(rootDir, 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.listen(port, '127.0.0.1', () => {
  console.log(`Zhongtang school API running at http://127.0.0.1:${port}`)
})
