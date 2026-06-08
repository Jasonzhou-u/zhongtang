<template>
  <main v-if="space">
    <PageHero
      :title="space.title"
      eyebrow="CAMPUS SPACE"
      :summary="space.summary"
      :image="space.image"
    />

    <section class="section space-detail">
      <RouterLink class="back-link" to="/views">返回堂中雅景</RouterLink>
      <div class="space-copy">
        <h2>{{ space.title }}</h2>
        <p>{{ space.description }}</p>
      </div>
      <div class="space-gallery">
        <img
          v-for="(image, index) in space.gallery"
          :key="image"
          :src="publicAsset(image)"
          :alt="`${space.title}空间图片 ${index + 1}`"
          :class="{ large: index === 0 }"
        />
      </div>
    </section>
  </main>

  <main v-else>
    <PageHero
      title="空间未找到"
      eyebrow="CAMPUS SPACE"
      summary="这个空间还没有录入，可以返回堂中雅景继续浏览。"
      image="/static/image/school/campus-overview.jpg"
    />
    <section class="section">
      <RouterLink class="back-link" to="/views">返回堂中雅景</RouterLink>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { findCampusSpace } from '../data/campusSpaces'
import { getContentSpaces } from '../services/api'
import { publicAsset } from '../utils/publicAsset'

const route = useRoute()
const space = ref(findCampusSpace(route.params.slug))

onMounted(async () => {
  try {
    const data = await getContentSpaces()
    const found = data.spaces?.find((item) => item.slug === route.params.slug)
    if (found) space.value = found
  } catch {
    space.value = findCampusSpace(route.params.slug)
  }
})
</script>
