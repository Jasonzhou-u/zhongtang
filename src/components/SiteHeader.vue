<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="北京十一学校中堂实验学校首页">
      <img :src="publicAsset('/static/image/school-logo-cropped.png')" alt="北京十一学校中堂实验学校" />
    </RouterLink>

    <button class="nav-toggle" type="button" @click="open = !open" aria-label="打开导航">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div :class="{ open }" class="header-actions">
      <nav class="site-nav">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" @click="open = false">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="login-menu" @mouseenter="loginOpen = true" @mouseleave="loginOpen = false">
        <button type="button" class="login-button" @click="loginOpen = !loginOpen">登录</button>
        <div v-show="loginOpen" class="login-dropdown">
          <a v-for="item in platformLinks" :key="item.label" :href="item.href" @click="open = false">
            {{ item.label }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { navItems, platformLinks } from '../data/siteData'
import { publicAsset } from '../utils/publicAsset'

const open = ref(false)
const loginOpen = ref(false)
</script>
