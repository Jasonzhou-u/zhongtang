<template>
  <main>
    <PageHero
      title="堂中雅景"
      eyebrow="CAMPUS VIEWS"
      summary="学习发生在教室，也发生在每一个可以停留、表达、合作和创造的角落。"
      image="/static/image/school/campus-overview.jpg"
    />

    <section class="section gallery-grid">
      <article v-for="view in campusViews" :key="view.title" :class="{ wide: view.wide }">
        <img :src="publicAsset(view.image)" :alt="view.title" />
        <div>
          <h3>{{ view.title }}</h3>
          <p>{{ view.summary }}</p>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import { campusViews } from '../data/siteData'
import { publicAsset } from '../utils/publicAsset'
</script>
