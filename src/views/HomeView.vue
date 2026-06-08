<template>
  <main>
    <HeroCarousel :slides="activeHeroSlides" />
    <NewsSection :items="activeNewsItems" />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import NewsSection from '../components/NewsSection.vue'
import { heroSlides } from '../data/siteData'
import { homeNewsItems } from '../data/newsData'
import { getContentHome, getContentNews } from '../services/api'

const activeHeroSlides = ref(heroSlides)
const activeNewsItems = ref(homeNewsItems)

onMounted(async () => {
  try {
    const [homeData, newsData] = await Promise.all([getContentHome(), getContentNews()])
    activeHeroSlides.value = homeData.heroSlides?.length ? homeData.heroSlides : heroSlides
    activeNewsItems.value = newsData.news?.length ? newsData.news.slice(0, 6) : homeNewsItems
  } catch {
    activeHeroSlides.value = heroSlides
    activeNewsItems.value = homeNewsItems
  }
})
</script>
