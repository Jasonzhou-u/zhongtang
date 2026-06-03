<template>
  <div class="heart-wall" aria-label="成长合伙人照片墙">
    <template v-for="(cell, index) in cells" :key="index">
      <img v-if="cell" :src="photos[index % photos.length]" alt="成长合伙人照片" />
      <span v-else></span>
    </template>
  </div>
</template>

<script setup>
defineProps({
  photos: { type: Array, required: true }
})

const rows = [
  '00100100',
  '01111110',
  '11111111',
  '11111111',
  '01111110',
  '00111100',
  '00011000',
  '00001000'
]

const cells = rows.flatMap((row) => row.split('').map((item) => item === '1'))
</script>
