<template>
  <section class="section past-events">
    <div class="section-heading row-heading">
      <div>
        <span>PAST EVENTS</span>
        <h2>往期活动</h2>
      </div>
      <div class="slider-actions">
        <button type="button" @click="move(-1)" aria-label="查看上一组活动">‹</button>
        <button type="button" @click="move(1)" aria-label="查看下一组活动">›</button>
      </div>
    </div>

    <div ref="track" class="past-track">
      <RouterLink v-for="event in events" :key="event.title" :to="event.to" class="past-card">
        <img :src="event.image" :alt="event.title" />
        <div>
          <time>{{ event.date }}</time>
          <h3>{{ event.title }}</h3>
          <p>{{ event.summary }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  events: { type: Array, required: true }
})

const track = ref(null)

function move(direction) {
  if (!track.value) return
  const firstCard = track.value.querySelector('.past-card')
  const distance = firstCard ? firstCard.offsetWidth + 28 : 420
  track.value.scrollBy({ left: direction * distance, behavior: 'smooth' })
}
</script>
