<template>
  <main>
    <PageHero
      title="新闻动态"
      eyebrow="NEWS"
      summary="浏览学校公众号发布的校园新闻、课程故事与活动信息。"
      image="/static/image/school/cafe.jpg"
    />

    <section class="section news-archive">
      <component v-for="item in newsItems" :key="item.title" :is="linkTag(item)" v-bind="linkProps(item)" class="archive-row">
        <img :src="publicAsset(item.image || '/static/image/school/cafe.jpg')" :alt="item.title" />
        <div>
          <span v-if="item.type === 'signup'">活动报名</span>
          <span v-else-if="item.type === 'activity'">活动原文</span>
          <span v-else>公众号原文</span>
          <h2>{{ item.title }}</h2>
          <time>{{ item.date }}</time>
          <p>{{ item.summary || '点击查看学校公众号原文。' }}</p>
        </div>
      </component>
    </section>
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import { newsItems } from '../data/siteData'
import { publicAsset } from '../utils/publicAsset'

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
