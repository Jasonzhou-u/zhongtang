<template>
  <main>
    <HeroCarousel :slides="heroSlides" />
    <NewsSection :items="newsItems" />
  </main>
</template>

<script setup>
import HeroCarousel from '../components/HeroCarousel.vue'
import NewsSection from '../components/NewsSection.vue'
import { heroSlides, newsItems } from '../data/siteData'
</script>
