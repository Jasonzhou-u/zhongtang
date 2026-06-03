<template>
  <main>
    <PageHero
      title="报名后台"
      eyebrow="ADMIN"
      summary="管理员登录后查看活动报名数据，报名信息不会公开展示。"
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
          <h2>报名记录</h2>
          <div>
            <a class="ghost-button" href="/api/admin/registrations/export.csv">导出 CSV</a>
            <button class="ghost-button" type="button" @click="handleLogout">退出登录</button>
          </div>
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
                <td><button class="text-button" type="button" @click="remove(item.id)">删除</button></td>
              </tr>
              <tr v-if="!registrations.length">
                <td colspan="7">暂无报名记录</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import { deleteRegistration, getAdminMe, getRegistrations, loginAdmin, logoutAdmin } from '../services/api'

const authed = ref(false)
const loading = ref(false)
const message = ref('')
const registrations = ref([])
const login = reactive({ username: '', password: '' })

async function loadRegistrations() {
  const data = await getRegistrations()
  registrations.value = data.registrations
}

async function handleLogin() {
  loading.value = true
  message.value = ''
  try {
    await loginAdmin(login)
    authed.value = true
    await loadRegistrations()
  } catch (err) {
    message.value = err.message
  } finally {
    loading.value = false
  }
}

async function handleLogout() {
  await logoutAdmin()
  authed.value = false
  registrations.value = []
}

async function remove(id) {
  await deleteRegistration(id)
  await loadRegistrations()
}

onMounted(async () => {
  try {
    await getAdminMe()
    authed.value = true
    await loadRegistrations()
  } catch {
    authed.value = false
  }
})
</script>
