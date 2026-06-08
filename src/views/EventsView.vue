<template>
  <main>
    <PageHero
      title="活动直通车"
      eyebrow="EVENTS"
      summary="查看近期开放活动，也可以浏览学校已经举办过的精彩项目。"
      image="/static/image/school/gym.jpg"
    />

    <section class="section">
      <div class="section-heading">
        <span>OPEN NOW</span>
        <h2>正在报名</h2>
      </div>
      <div class="activity-grid">
        <article v-for="activity in activeOpenActivities" :key="activity.id" class="activity-card">
          <img :src="publicAsset(activity.image)" :alt="activity.title" />
          <div>
            <time>{{ activity.date }}</time>
            <h3>{{ activity.title }}</h3>
            <p>{{ activity.summary }}</p>
            <RouterLink class="primary-link" :to="{ path: '/signup', query: { activity: activity.title } }">立即报名</RouterLink>
          </div>
        </article>
      </div>
    </section>

    <PastEventsSlider :events="activePastActivities" />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import PastEventsSlider from '../components/PastEventsSlider.vue'
import { openActivities, pastActivities } from '../data/siteData'
import { getContentActivities } from '../services/api'
import { publicAsset } from '../utils/publicAsset'

const activeOpenActivities = ref(openActivities)
const activePastActivities = ref(pastActivities)

onMounted(async () => {
  try {
    const data = await getContentActivities()
    activeOpenActivities.value = data.open?.length ? data.open : openActivities
    activePastActivities.value = data.past?.length ? data.past : pastActivities
  } catch {
    activeOpenActivities.value = openActivities
    activePastActivities.value = pastActivities
  }
})
</script>
