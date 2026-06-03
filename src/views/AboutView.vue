<template>
  <main>
    <PageHero
      title="中堂简介"
      eyebrow="ABOUT ZHONGTANG"
      summary="传承北京十一学校文化基因，建设高质量、可选择、有温度的学习社区。"
      image="/static/image/操场.jpg"
    />

    <section class="section two-column">
      <div class="rich-copy">
        <span class="eyebrow">SCHOOL VISION</span>
        <h2>办一所为学习者而存在的学校</h2>
        <p>北京十一学校中堂实验学校以学习者成长为中心，将课程、空间、活动、导师和家校资源组织成支持学生发展的生态系统，让每个学生在真实情境中发现热爱、建立能力、形成责任。</p>
        <p>学校重视基础性课程的扎实支撑，也鼓励研究性、拓展性课程打开学生的选择空间。学习不只发生在教室，也发生在公共空间、社群活动、项目展示和日常对话里。</p>
      </div>
      <img class="content-image" :src="publicAsset('/static/image/brochure/brochure-page-1.png')" alt="学校手册内容" />
    </section>

    <section class="section value-band">
      <article>
        <span>01</span>
        <h3>中国根脉</h3>
        <p>在文化理解与真实生活中建立身份认同。</p>
      </article>
      <article>
        <span>02</span>
        <h3>世界胸襟</h3>
        <p>以开放视野理解多元世界与共同议题。</p>
      </article>
      <article>
        <span>03</span>
        <h3>智慧头脑</h3>
        <p>通过研究、表达与创造形成解决问题的能力。</p>
      </article>
      <article>
        <span>04</span>
        <h3>未来胜任力</h3>
        <p>在选择、合作和行动中走向更主动的成长。</p>
      </article>
    </section>

    <section class="section two-column reverse">
      <img class="content-image" :src="publicAsset('/static/image/brochure/brochure-page-2.png')" alt="课程与学习社区手册内容" />
      <div class="rich-copy">
        <span class="eyebrow">LEARNING COMMUNITY</span>
        <h2>多元课程与学习社区</h2>
        <p>围绕语言表达、人文社会、科学技术、体育健康和综合实践等方向，学校不断扩展课程资源，让学生能够在共同基础之上进行个性化选择。</p>
        <p>校园空间被设计成成长资源：青蹊 Soho、中糖咖啡屋、美术馆、造物局和体育空间共同支持学生展示、交流、合作与创造。</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import { publicAsset } from '../utils/publicAsset'
</script>
