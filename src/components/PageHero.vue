<template>
  <section class="page-hero" :style="{ backgroundImage: `linear-gradient(90deg, rgba(18, 47, 50, .82), rgba(18, 47, 50, .26)), url(${image})` }">
    <div class="page-hero-inner">
      <span>{{ eyebrow }}</span>
      <h1>{{ title }}</h1>
      <p v-if="summary">{{ summary }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  eyebrow: { type: String, default: '' },
  summary: { type: String, default: '' },
  image: { type: String, default: '/static/image/操场.jpg' }
})
</script>
