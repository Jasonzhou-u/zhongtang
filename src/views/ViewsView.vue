<template>
  <main>
    <PageHero
      title="堂中雅景"
      eyebrow="CAMPUS VIEWS"
      summary="学习发生在教室，也发生在每一个可以停留、表达、合作和创造的角落。"
      image="/static/image/spaces/corridor/corridor-1.jpg"
    />

    <section class="section gallery-grid">
      <RouterLink
        v-for="view in activeCampusSpaces"
        :key="view.slug"
        class="view-card"
        :class="{ wide: view.wide }"
        :to="{ name: 'space-detail', params: { slug: view.slug } }"
      >
        <img :src="publicAsset(view.image)" :alt="view.title" />
        <div>
          <h3>{{ view.title }}</h3>
          <p>{{ view.summary }}</p>
          <span>进入空间</span>
        </div>
      </RouterLink>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import { campusSpaces } from '../data/campusSpaces'
import { getContentSpaces } from '../services/api'
import { publicAsset } from '../utils/publicAsset'

const activeCampusSpaces = ref(campusSpaces)

onMounted(async () => {
  try {
    const data = await getContentSpaces()
    activeCampusSpaces.value = data.spaces?.length ? data.spaces : campusSpaces
  } catch {
    activeCampusSpaces.value = campusSpaces
  }
})
</script>
