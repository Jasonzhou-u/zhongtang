<template>
  <main>
    <PageHero
      title="成长合伙人"
      eyebrow="GROWTH PARTNERS"
      summary="用专业陪伴、真实看见和持续支持，和学生一起完成成长。"
      image="/static/image/school/corridor.jpg"
    />

    <section class="section partners-intro">
      <div>
        <span class="eyebrow">TEAM</span>
        <h2>每一位教师，都是学生成长路上的合伙人</h2>
        <p>成长合伙人不仅关注成绩，也关注学生的目标感、学习方法、自我管理、表达能力和心理能量。学校通过导师陪伴、课程支持、项目指导和家校沟通，让每一个孩子在真实关系中被看见、被理解、被支持。</p>
      </div>
      <HeartTeam :photos="activeTeacherPhotos" />
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HeartTeam from '../components/HeartTeam.vue'
import PageHero from '../components/PageHero.vue'
import { teacherPhotos } from '../data/teacherData'
import { getContentTeachers } from '../services/api'

const activeTeacherPhotos = ref(teacherPhotos)

onMounted(async () => {
  try {
    const data = await getContentTeachers()
    activeTeacherPhotos.value = data.teachers?.length ? data.teachers : teacherPhotos
  } catch {
    activeTeacherPhotos.value = teacherPhotos
  }
})
</script>
