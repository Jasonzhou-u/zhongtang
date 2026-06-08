<template>
  <main>
    <PageHero
      title="网站管理后台"
      eyebrow="ADMIN"
      summary="管理员登录后可以管理活动报名、新闻动态、活动直通车、堂中雅景、成长合伙人和首页轮播。"
      image="/static/image/school/soho.jpg"
    />

    <section class="section admin-shell">
      <form v-if="!authed" class="admin-login" @submit.prevent="handleLogin">
        <label>
          <span>管理员账号</span>
          <input v-model.trim="login.username" type="text" required />
        </label>
        <label>
          <span>管理员密码</span>
          <input v-model="login.password" type="password" required />
        </label>
        <button class="submit-button" type="submit" :disabled="loading">{{ loading ? '登录中...' : '登录后台' }}</button>
        <p v-if="message" class="form-message error">{{ message }}</p>
      </form>

      <div v-else class="admin-panel">
        <div class="admin-toolbar">
          <div>
            <h2>内容管理中心</h2>
            <p>日常更新可在这里完成，保存后前台会优先读取后台内容。</p>
          </div>
          <button class="ghost-button" type="button" @click="handleLogout">退出登录</button>
        </div>

        <nav class="admin-tabs" aria-label="后台模块">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            :class="{ active: activeTab === tab.key }"
            @click="switchTab(tab.key)"
          >
            {{ tab.label }}
          </button>
        </nav>

        <section v-if="activeTab === 'registrations'" class="admin-block">
          <div class="admin-subtoolbar">
            <h3>报名记录</h3>
            <a class="ghost-button" href="/api/admin/registrations/export.csv">导出 CSV</a>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>时间</th>
                  <th>活动</th>
                  <th>姓名</th>
                  <th>班级</th>
                  <th>电话</th>
                  <th>备注</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in registrations" :key="item.id">
                  <td>{{ item.createdAt }}</td>
                  <td>{{ item.activity }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.className }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.note || '-' }}</td>
                  <td><button class="text-button" type="button" @click="removeRegistration(item.id)">删除</button></td>
                </tr>
                <tr v-if="!registrations.length">
                  <td colspan="7">暂无报名记录</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section v-else-if="activeTab === 'settings'" class="admin-block">
          <div class="admin-subtoolbar">
            <h3>基础信息</h3>
            <button class="ghost-button" type="button" @click="saveSettings">保存基础信息</button>
          </div>
          <div class="admin-form-grid single">
            <label>
              <span>单位地址</span>
              <input v-model.trim="settingsForm.address" type="text" />
            </label>
            <label>
              <span>邮政编码</span>
              <input v-model.trim="settingsForm.postcode" type="text" />
            </label>
            <label>
              <span>邮箱</span>
              <input v-model.trim="settingsForm.email" type="email" />
            </label>
            <label>
              <span>公众号二维码路径</span>
              <input v-model.trim="settingsForm.wechatQr" type="text" />
            </label>
            <label>
              <span>上传公众号二维码</span>
              <input type="file" accept="image/*" @change="uploadToSettings" />
            </label>
            <label>
              <span>ICP备案</span>
              <input v-model.trim="settingsForm.icp" type="text" />
            </label>
            <label>
              <span>公安备案</span>
              <input v-model.trim="settingsForm.police" type="text" />
            </label>
          </div>
        </section>

        <section v-else class="admin-block content-editor">
          <div class="admin-subtoolbar">
            <h3>{{ currentSection.label }}</h3>
            <button class="ghost-button" type="button" @click="startCreate">新增内容</button>
          </div>

          <div class="content-admin-layout">
            <div class="content-list">
              <button
                v-for="item in activeItems"
                :key="item.id || item.slug"
                type="button"
                :class="{ active: selectedKey === itemKey(item) }"
                @click="startEdit(item)"
              >
                <strong>{{ item.title || item.name || item.eyebrow || '未命名内容' }}</strong>
                <span>{{ item.date || item.slug || item.image || '未设置' }}</span>
              </button>
              <p v-if="!activeItems.length" class="empty-state">暂无内容，可以点击“新增内容”。</p>
            </div>

            <form class="content-form" @submit.prevent="saveItem">
              <label v-for="field in currentSection.fields" :key="field.key" :class="{ full: field.type === 'textarea' }">
                <span>{{ field.label }}</span>
                <textarea v-if="field.type === 'textarea'" v-model="form[field.key]" rows="5"></textarea>
                <select v-else-if="field.type === 'select'" v-model="form[field.key]">
                  <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
                </select>
                <input v-else-if="field.type === 'checkbox'" v-model="form[field.key]" type="checkbox" />
                <input v-else v-model="form[field.key]" :type="field.type || 'text'" />
              </label>

              <label v-if="hasImageField" class="full">
                <span>上传图片到当前图片字段</span>
                <input type="file" accept="image/*" @change="uploadToForm" />
              </label>

              <div class="form-actions">
                <button class="submit-button" type="submit">{{ editingId ? '保存修改' : '创建内容' }}</button>
                <button v-if="editingId" class="ghost-button" type="button" @click="deleteItem">删除</button>
                <button class="ghost-button" type="button" @click="startCreate">清空表单</button>
              </div>
            </form>
          </div>
        </section>

        <p v-if="message" class="form-message" :class="{ error: messageType === 'error' }">{{ message }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import {
  createContentItem,
  deleteContentItem,
  deleteRegistration,
  getAdminContent,
  getAdminMe,
  getRegistrations,
  loginAdmin,
  logoutAdmin,
  saveAdminSettings,
  updateContentItem,
  uploadImage
} from '../services/api'

const tabs = [
  { key: 'registrations', label: '报名数据' },
  { key: 'news', label: '新闻动态' },
  { key: 'openActivities', label: '正在报名' },
  { key: 'pastActivities', label: '往期活动' },
  { key: 'spaces', label: '堂中雅景' },
  { key: 'teachers', label: '成长合伙人' },
  { key: 'heroSlides', label: '首页轮播' },
  { key: 'settings', label: '基础信息' }
]

const sections = {
  news: {
    label: '新闻动态',
    fields: [
      { key: 'date', label: '日期', type: 'text' },
      { key: 'title', label: '标题', type: 'text' },
      { key: 'summary', label: '摘要', type: 'textarea' },
      { key: 'image', label: '封面图路径', type: 'text' },
      { key: 'category', label: '分类', type: 'text' },
      {
        key: 'source',
        label: '跳转类型',
        type: 'select',
        options: [
          { value: 'wechat', label: '公众号外链' },
          { value: 'internal', label: '站内新闻' },
          { value: 'signup', label: '活动报名' }
        ]
      },
      { key: 'href', label: '公众号链接', type: 'text' },
      { key: 'to', label: '站内路径', type: 'text' },
      { key: 'slug', label: '站内新闻标识', type: 'text' },
      { key: 'bodyText', label: '站内正文，每行一段', type: 'textarea' },
      { key: 'order', label: '排序', type: 'number' },
      { key: 'published', label: '前台显示', type: 'checkbox' }
    ]
  },
  openActivities: {
    label: '正在报名',
    fields: [
      { key: 'date', label: '日期', type: 'text' },
      { key: 'title', label: '活动名称', type: 'text' },
      { key: 'summary', label: '活动简介', type: 'textarea' },
      { key: 'image', label: '封面图路径', type: 'text' },
      { key: 'order', label: '排序', type: 'number' },
      { key: 'published', label: '前台显示', type: 'checkbox' }
    ]
  },
  pastActivities: {
    label: '往期活动',
    fields: [
      { key: 'date', label: '日期', type: 'text' },
      { key: 'title', label: '活动名称', type: 'text' },
      { key: 'summary', label: '活动简介', type: 'textarea' },
      { key: 'image', label: '封面图路径', type: 'text' },
      { key: 'to', label: '跳转路径', type: 'text' },
      { key: 'order', label: '排序', type: 'number' },
      { key: 'published', label: '前台显示', type: 'checkbox' }
    ]
  },
  spaces: {
    label: '堂中雅景',
    fields: [
      { key: 'slug', label: '空间标识', type: 'text' },
      { key: 'title', label: '空间名称', type: 'text' },
      { key: 'summary', label: '卡片简介', type: 'textarea' },
      { key: 'description', label: '详情介绍', type: 'textarea' },
      { key: 'image', label: '封面图路径', type: 'text' },
      { key: 'galleryText', label: '详情图集，每行一张图片路径', type: 'textarea' },
      { key: 'wide', label: '首页宽卡片', type: 'checkbox' },
      { key: 'order', label: '排序', type: 'number' },
      { key: 'published', label: '前台显示', type: 'checkbox' }
    ]
  },
  teachers: {
    label: '成长合伙人',
    fields: [
      { key: 'name', label: '教师姓名', type: 'text' },
      { key: 'image', label: '头像图片路径', type: 'text' },
      { key: 'order', label: '排序', type: 'number' },
      { key: 'published', label: '前台显示', type: 'checkbox' }
    ]
  },
  heroSlides: {
    label: '首页轮播',
    fields: [
      { key: 'eyebrow', label: '小标题', type: 'text' },
      { key: 'title', label: '主标题', type: 'text' },
      { key: 'summary', label: '说明文字', type: 'textarea' },
      { key: 'image', label: '背景图路径', type: 'text' },
      { key: 'link', label: '按钮链接', type: 'text' },
      { key: 'linkText', label: '按钮文字', type: 'text' },
      { key: 'order', label: '排序', type: 'number' },
      { key: 'published', label: '前台显示', type: 'checkbox' }
    ]
  }
}

const authed = ref(false)
const loading = ref(false)
const message = ref('')
const messageType = ref('ok')
const activeTab = ref('registrations')
const registrations = ref([])
const content = ref(null)
const selectedKey = ref('')
const editingId = ref('')
const form = reactive({})
const settingsForm = reactive({})
const login = reactive({ username: '', password: '' })

const currentSection = computed(() => sections[activeTab.value] || sections.news)
const activeItems = computed(() => {
  if (!content.value) return []
  const map = {
    news: content.value.news,
    openActivities: content.value.activities?.open,
    pastActivities: content.value.activities?.past,
    spaces: content.value.spaces,
    teachers: content.value.teachers,
    heroSlides: content.value.home?.heroSlides
  }
  return [...(map[activeTab.value] || [])].sort((a, b) => Number(a.order || 999) - Number(b.order || 999))
})
const hasImageField = computed(() => currentSection.value.fields?.some((field) => field.key === 'image'))

function showMessage(text, type = 'ok') {
  message.value = text
  messageType.value = type
}

function itemKey(item) {
  return String(item.id || item.slug)
}

function clearForm() {
  Object.keys(form).forEach((key) => delete form[key])
  currentSection.value.fields.forEach((field) => {
    if (field.type === 'checkbox') form[field.key] = field.key === 'published'
    else if (field.type === 'number') form[field.key] = ''
    else if (field.key === 'source') form[field.key] = 'wechat'
    else form[field.key] = ''
  })
}

function itemToForm(item = {}) {
  clearForm()
  Object.assign(form, item)
  form.bodyText = Array.isArray(item.body) ? item.body.join('\n') : item.bodyText || ''
  form.galleryText = Array.isArray(item.gallery) ? item.gallery.join('\n') : item.galleryText || ''
  form.published = item.published !== false
}

function formToItem() {
  const item = { ...form }
  item.order = item.order === '' ? 999 : Number(item.order)
  item.published = Boolean(item.published)

  if ('bodyText' in item) {
    item.body = String(item.bodyText || '').split('\n').map((line) => line.trim()).filter(Boolean)
    delete item.bodyText
  }
  if ('galleryText' in item) {
    item.gallery = String(item.galleryText || '').split('\n').map((line) => line.trim()).filter(Boolean)
    delete item.galleryText
  }
  return item
}

function switchTab(key) {
  activeTab.value = key
  message.value = ''
  selectedKey.value = ''
  editingId.value = ''
  if (sections[key]) startCreate()
}

function startCreate() {
  selectedKey.value = ''
  editingId.value = ''
  clearForm()
}

function startEdit(item) {
  selectedKey.value = itemKey(item)
  editingId.value = itemKey(item)
  itemToForm(item)
}

async function loadRegistrations() {
  const data = await getRegistrations()
  registrations.value = data.registrations
}

async function loadContent() {
  const data = await getAdminContent()
  content.value = data.content
  Object.assign(settingsForm, data.content.settings || {})
  if (sections[activeTab.value]) startCreate()
}

async function handleLogin() {
  loading.value = true
  message.value = ''
  try {
    await loginAdmin(login)
    authed.value = true
    await Promise.all([loadRegistrations(), loadContent()])
  } catch (err) {
    showMessage(err.message, 'error')
  } finally {
    loading.value = false
  }
}

async function handleLogout() {
  await logoutAdmin()
  authed.value = false
  registrations.value = []
  content.value = null
}

async function removeRegistration(id) {
  if (!window.confirm('确认删除这条报名记录吗？')) return
  await deleteRegistration(id)
  await loadRegistrations()
  showMessage('报名记录已删除')
}

async function saveItem() {
  try {
    const payload = formToItem()
    if (editingId.value) {
      await updateContentItem(activeTab.value, editingId.value, payload)
      showMessage('内容已保存')
    } else {
      await createContentItem(activeTab.value, payload)
      showMessage('内容已创建')
    }
    await loadContent()
  } catch (err) {
    showMessage(err.message, 'error')
  }
}

async function deleteItem() {
  if (!editingId.value || !window.confirm('确认删除这条内容吗？')) return
  try {
    await deleteContentItem(activeTab.value, editingId.value)
    await loadContent()
    showMessage('内容已删除')
  } catch (err) {
    showMessage(err.message, 'error')
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function uploadFile(file) {
  const dataUrl = await readFileAsDataUrl(file)
  const data = await uploadImage({ name: file.name, dataUrl })
  return data.url
}

async function uploadToForm(event) {
  const file = event.target.files?.[0]
  if (!file) return
  try {
    form.image = await uploadFile(file)
    showMessage('图片已上传，保存内容后生效')
  } catch (err) {
    showMessage(err.message, 'error')
  } finally {
    event.target.value = ''
  }
}

async function uploadToSettings(event) {
  const file = event.target.files?.[0]
  if (!file) return
  try {
    settingsForm.wechatQr = await uploadFile(file)
    showMessage('二维码已上传，请保存基础信息')
  } catch (err) {
    showMessage(err.message, 'error')
  } finally {
    event.target.value = ''
  }
}

async function saveSettings() {
  try {
    await saveAdminSettings(settingsForm)
    await loadContent()
    showMessage('基础信息已保存')
  } catch (err) {
    showMessage(err.message, 'error')
  }
}

onMounted(async () => {
  try {
    await getAdminMe()
    authed.value = true
    await Promise.all([loadRegistrations(), loadContent()])
  } catch {
    authed.value = false
  }
})
</script>
