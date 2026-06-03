<template>
  <main>
    <PageHero
      title="名人堂"
      eyebrow="HALL OF FAME"
      summary="记录学生在项目、表达、服务、体育与创造中的高光时刻。"
      image="/static/image/school/gallery.jpg"
    />

    <section class="section hall-grid">
      <article v-for="person in people" :key="person.name">
        <span>{{ person.tag }}</span>
        <h3>{{ person.name }}</h3>
        <p>{{ person.story }}</p>
      </article>
    </section>
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'

const people = [
  { tag: '项目创造', name: '智能 Agent 项目组', story: '围绕校园真实需求完成智能助手原型，并在创意展中进行公开演示。' },
  { tag: '艺术表达', name: '此时此地策展团队', story: '参与作品征集、空间布展和现场导览，让学生作品被更多人看见。' },
  { tag: '志愿服务', name: '运动季志愿者团队', story: '在大型活动中承担秩序维护、摄影记录和后勤支持，展现责任与协作。' },
  { tag: '研究学习', name: '研究性课程展示小组', story: '以真实问题为起点完成调研、建模、展示与答辩，形成可分享的成果。' }
]
</script>
