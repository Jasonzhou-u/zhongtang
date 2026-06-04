<template>
  <main>
    <HeroCarousel :slides="heroSlides" />
    <NewsSection :items="homeNewsItems" />
  </main>
</template>

<script setup>
import HeroCarousel from '../components/HeroCarousel.vue'
import NewsSection from '../components/NewsSection.vue'
import { heroSlides } from '../data/siteData'
import { homeNewsItems } from '../data/newsData'
</script>
