<template>
  <section class="section news-section">
    <div class="section-heading row-heading">
      <div>
        <span>NEWS</span>
        <h2>新闻动态</h2>
      </div>
      <RouterLink class="news-more-link" to="/news">查看更多</RouterLink>
    </div>

    <div v-if="featured" class="news-grid">
      <component :is="getNewsLinkTag(featured)" v-bind="getNewsLinkProps(featured)" class="feature-news">
        <img :src="publicAsset(featured.image || '/static/image/school/cafe.jpg')" :alt="featured.title" />
        <div>
          <time>{{ featured.date }}</time>
          <h3>{{ featured.title }}</h3>
          <p>{{ featured.summary || '点击查看学校新闻详情。' }}</p>
        </div>
      </component>

      <div class="news-list">
        <component
          v-for="item in listItems"
          :key="item.id"
          :is="getNewsLinkTag(item)"
          v-bind="getNewsLinkProps(item)"
          class="news-row"
        >
          <img :src="publicAsset(item.image || '/static/image/school/cafe.jpg')" :alt="item.title" />
          <div>
            <strong>{{ item.title }}</strong>
            <time>{{ item.date }}</time>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { getNewsLinkProps, getNewsLinkTag } from '../data/newsData'
import { publicAsset } from '../utils/publicAsset'

const props = defineProps({
  items: { type: Array, required: true }
})

const featured = computed(() => props.items[0])
const listItems = computed(() => props.items.slice(1, 6))
</script>
