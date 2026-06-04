<template>
  <div class="heart-wall" aria-label="成长合伙人教师头像墙">
    <template v-for="(cell, index) in displayCells" :key="index">
      <button
        v-if="cell"
        class="heart-photo"
        type="button"
        :title="`${cell.name}老师`"
        @click="selected = cell"
      >
        <img
          :src="publicAsset(cell.image)"
          :alt="`${cell.name}老师`"
        />
      </button>
      <span v-else></span>
    </template>
  </div>

  <div v-if="selected" class="teacher-preview" role="dialog" aria-modal="true" @click.self="selected = null">
    <button type="button" aria-label="关闭" @click="selected = null">×</button>
    <img :src="publicAsset(selected.image)" :alt="`${selected.name}老师`" />
    <strong>{{ selected.name }}老师</strong>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { publicAsset } from '../utils/publicAsset'

const props = defineProps({
  photos: { type: Array, required: true }
})

const selected = ref(null)

const rows = [
  '00010101000',
  '00111111100',
  '01111111110',
  '11111111111',
  '11111111111',
  '01111111110',
  '00111111100',
  '00011111000',
  '00001110000',
  '00000100000'
]

const cells = rows.flatMap((row) => row.split('').map((item) => item === '1'))

const displayCells = computed(() => {
  let photoIndex = 0

  return cells.map((filled) => {
    if (!filled) return null
    const photo = props.photos[photoIndex % props.photos.length]
    photoIndex += 1
    return typeof photo === 'string' ? { name: '成长合伙人', image: photo } : photo
  })
})
</script>
