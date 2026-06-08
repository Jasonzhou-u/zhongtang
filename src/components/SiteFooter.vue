<template>
  <footer class="site-footer" :style="{ '--footer-bg': `url(${publicAsset('/static/image/footer-campus-bg.png')})` }">
    <div class="footer-main">
      <section>
        <h2>联系我们</h2>
        <p>单位地址：{{ settings.address }}</p>
        <p>邮政编码：{{ settings.postcode }}</p>
        <p>邮箱：{{ settings.email }}</p>
      </section>

      <section class="footer-wechat">
        <h2>关注公众号</h2>
        <img :src="publicAsset(settings.wechatQr)" alt="北京十一学校中堂实验学校公众号二维码" />
        <p>北京十一学校中堂实验学校</p>
      </section>
    </div>

    <div class="footer-bottom">
      <span>Copyright © 2026 北京十一学校中堂实验学校. All Rights Reserved.</span>
      <span>{{ settings.icp }}</span>
      <span>{{ settings.police }}</span>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { getContentHome } from '../services/api'
import { publicAsset } from '../utils/publicAsset'

const settings = reactive({
  address: '北京市丰台区梅市口路2号院',
  postcode: '100161',
  email: 'bndszes@126.com',
  wechatQr: '/static/image/wechat-qr-cropped.png',
  icp: '京ICP备00000000号-1',
  police: '京公网安备 11000000000000号'
})

onMounted(async () => {
  try {
    const data = await getContentHome()
    Object.assign(settings, data.settings || {})
  } catch {
    // Keep the static school contact information when the API is unavailable.
  }
})
</script>
