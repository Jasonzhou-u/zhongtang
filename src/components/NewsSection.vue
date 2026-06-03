<template>
  <section class="section news-section">
    <div class="section-heading row-heading">
      <div>
        <span>NEWS</span>
        <h2>新闻动态</h2>
      </div>
      <RouterLink class="news-more-link" to="/news">查看更多</RouterLink>
    </div>

    <div class="news-grid">
      <component :is="linkTag(featured)" v-bind="linkProps(featured)" class="feature-news">
        <img :src="featured.image || '/static/image/school/cafe.jpg'" :alt="featured.title" />
        <div>
          <time>{{ featured.date }}</time>
          <h3>{{ featured.title }}</h3>
          <p>{{ featured.summary || '来自学校公众号的最新校园动态，点击查看详细内容。' }}</p>
        </div>
      </component>

      <div class="news-list">
        <component v-for="item in listItems" :key="item.title" :is="linkTag(item)" v-bind="linkProps(item)" class="news-row">
          <img :src="item.image || '/static/image/school/cafe.jpg'" :alt="item.title" />
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

const props = defineProps({
  items: { type: Array, required: true }
})

const featured = computed(() => props.items[0])
const listItems = computed(() => props.items.slice(1, 6))

function linkTag(item) {
  return item.href ? 'a' : 'RouterLink'
}

function linkProps(item) {
  if (item.href) {
    return {
      href: item.href,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }

  return {
    to: item.query ? { path: item.to, query: item.query } : item.to
  }
}
</script>
