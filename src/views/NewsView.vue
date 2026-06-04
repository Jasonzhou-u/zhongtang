<template>
  <main>
    <PageHero
      title="新闻动态"
      eyebrow="NEWS"
      summary="集中浏览学校新闻、公众号原文、站内发布和活动报名入口。"
      image="/static/image/school/cafe.jpg"
    />

    <section class="section news-archive">
      <div class="news-toolbar">
        <div>
          <strong>新闻中心</strong>
          <p>共 {{ sortedNewsItems.length }} 条，当前显示 {{ visibleItems.length }} 条。</p>
        </div>
      </div>

      <component
        v-for="item in visibleItems"
        :key="item.id"
        :is="getNewsLinkTag(item)"
        v-bind="getNewsLinkProps(item)"
        class="archive-row"
      >
        <img :src="publicAsset(item.image || '/static/image/school/cafe.jpg')" :alt="item.title" />
        <div>
          <span>{{ getNewsBadge(item) }}</span>
          <h2>{{ item.title }}</h2>
          <time>{{ item.date }}</time>
          <p>{{ item.summary || '点击查看学校新闻详情。' }}</p>
        </div>
      </component>

      <button v-if="hasMore" class="load-more-button" type="button" @click="visibleCount += NEWS_PAGE_SIZE">
        加载更多
      </button>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import {
  NEWS_PAGE_SIZE,
  getNewsBadge,
  getNewsLinkProps,
  getNewsLinkTag,
  sortedNewsItems
} from '../data/newsData'
import { publicAsset } from '../utils/publicAsset'

const visibleCount = ref(NEWS_PAGE_SIZE)
const visibleItems = computed(() => sortedNewsItems.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < sortedNewsItems.length)
</script>
