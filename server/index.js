import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const port = Number(process.env.PORT || 5511)
const adminUsername = process.env.ADMIN_USERNAME || 'admin'
const adminPassword = process.env.ADMIN_PASSWORD || 'zt2026'
const sessionSecret = process.env.SESSION_SECRET || 'dev-secret-change-me'
const databasePath = path.resolve(rootDir, process.env.DATABASE_PATH || './data/registrations.json')

fs.mkdirSync(path.dirname(databasePath), { recursive: true })

function readRegistrations() {
  if (!fs.existsSync(databasePath)) return []
  try {
    const content = fs.readFileSync(databasePath, 'utf8')
    const rows = JSON.parse(content)
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

function writeRegistrations(rows) {
  fs.writeFileSync(databasePath, JSON.stringify(rows, null, 2), 'utf8')
}

const app = express()
app.use(express.json({ limit: '1mb' }))

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
