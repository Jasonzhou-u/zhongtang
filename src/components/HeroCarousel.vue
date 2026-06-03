<template>
  <section class="hero-carousel" @mouseenter="pause" @mouseleave="resume">
    <article v-for="(slide, index) in slides" :key="slide.title" class="hero-slide" :class="{ active: index === active }">
      <img :src="publicAsset(slide.image)" :alt="slide.title" />
      <div class="hero-copy">
        <span>{{ slide.eyebrow }}</span>
        <h1>{{ slide.title }}</h1>
        <p>{{ slide.summary }}</p>
        <RouterLink :to="slide.link" class="primary-link">{{ slide.linkText }}</RouterLink>
      </div>
    </article>

    <div class="hero-controls">
      <button v-for="(slide, index) in slides" :key="slide.title" type="button" :class="{ active: index === active }" @click="active = index" :aria-label="`切换到第 ${index + 1} 张`"></button>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { publicAsset } from '../utils/publicAsset'

const props = defineProps({
  slides: { type: Array, required: true }
})

const active = ref(0)
let timer = null

function next() {
  active.value = (active.value + 1) % props.slides.length
}

function resume() {
  timer = window.setInterval(next, 4200)
}

function pause() {
  window.clearInterval(timer)
}

onMounted(resume)
onBeforeUnmount(pause)
</script>
