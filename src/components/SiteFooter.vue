<template>
  <footer class="site-footer" :style="{ '--footer-bg': `url(${publicAsset('/static/image/footer-campus-bg.png')})` }">
    <div class="footer-main">
      <section>
        <h2>联系我们</h2>
        <p>单位地址：北京市丰台区梅市口路2号院</p>
        <p>邮政编码：100161</p>
        <p>邮箱：bndszes@126.com</p>
      </section>

      <section class="footer-wechat">
        <h2>关注公众号</h2>
        <img :src="publicAsset('/static/image/wechat-qr.png')" alt="北京十一学校中堂实验学校公众号二维码" />
        <p>北京十一学校中堂实验学校</p>
      </section>
    </div>

    <div class="footer-bottom">
      <span>Copyright © 2026 北京十一学校中堂实验学校. All Rights Reserved.</span>
      <span>京ICP备00000000号-1</span>
      <span>京公网安备 11000000000000号</span>
    </div>
  </footer>
</template>

<script setup>
import { publicAsset } from '../utils/publicAsset'
</script>
