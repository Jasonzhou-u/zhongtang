<template>
  <main v-if="news">
    <PageHero
      :title="news.title"
      eyebrow="NEWS"
      :summary="news.summary"
      :image="news.image || '/static/image/school/cafe.jpg'"
    />

    <article class="section news-detail">
      <RouterLink class="back-link" to="/news">返回新闻动态</RouterLink>
      <div class="news-detail-meta">
        <span>{{ news.category || '站内新闻' }}</span>
        <time>{{ news.date }}</time>
      </div>
      <h2>{{ news.title }}</h2>
      <p v-for="paragraph in news.body" :key="paragraph">{{ paragraph }}</p>
    </article>
  </main>

  <main v-else>
    <PageHero
      title="新闻未找到"
      eyebrow="NEWS"
      summary="这条新闻可能已经移动或尚未发布。"
      image="/static/image/school/cafe.jpg"
    />
    <section class="section">
      <RouterLink class="back-link" to="/news">返回新闻动态</RouterLink>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { findInternalNews } from '../data/newsData'

const route = useRoute()
const news = findInternalNews(route.params.slug)
</script>
