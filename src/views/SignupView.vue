<template>
  <main>
    <PageHero
      title="活动报名"
      eyebrow="SIGN UP"
      summary="提交后报名信息将进入后台，只有管理员登录后可以查看。"
      image="/static/image/school/classroom.jpg"
    />

    <section class="section form-shell">
      <form class="signup-form" @submit.prevent="handleSubmit">
        <label>
          <span>报名活动</span>
          <select v-model="form.activity" required>
            <option value="" disabled>请选择活动</option>
            <option v-for="activity in openActivities" :key="activity.id" :value="activity.title">{{ activity.title }}</option>
          </select>
        </label>
        <label>
          <span>学生姓名</span>
          <input v-model.trim="form.name" type="text" required placeholder="请输入学生姓名" />
        </label>
        <label>
          <span>班级</span>
          <input v-model.trim="form.className" type="text" required placeholder="例如：七年级 1 班" />
        </label>
        <label>
          <span>联系电话</span>
          <input v-model.trim="form.phone" type="tel" required placeholder="用于活动通知" />
        </label>
        <label class="full">
          <span>备注</span>
          <textarea v-model.trim="form.note" rows="5" placeholder="可填写特殊说明或想参与的岗位"></textarea>
        </label>
        <button class="submit-button" type="submit" :disabled="loading">{{ loading ? '提交中...' : '提交报名' }}</button>
        <p v-if="message" class="form-message" :class="{ error }">{{ message }}</p>
      </form>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { openActivities } from '../data/siteData'
import { submitRegistration } from '../services/api'

const route = useRoute()
const loading = ref(false)
const message = ref('')
const error = ref(false)
const form = reactive({
  activity: '',
  name: '',
  className: '',
  phone: '',
  note: ''
})

watchEffect(() => {
  if (typeof route.query.activity === 'string') {
    form.activity = route.query.activity
  }
})

async function handleSubmit() {
  loading.value = true
  message.value = ''
  error.value = false
  try {
    await submitRegistration(form)
    message.value = '报名已提交，后台已收到信息。'
    form.name = ''
    form.className = ''
    form.phone = ''
    form.note = ''
  } catch (err) {
    error.value = true
    message.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
