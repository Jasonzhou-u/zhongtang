# 北京十一学校中堂实验学校官网

这是一个 Vue 3 + Vite 的校园官网项目，包含首页轮播、新闻动态、学校简介、成长合伙人、活动直通车、堂中雅景、名人堂，以及带管理员登录的活动报名后台。

## 项目结构

```text
public/static/        学校图片、手册图片、视频等静态资源
src/components/       通用 Vue 组件
src/views/            各栏目页面
src/data/             网站内容数据
src/services/         前端 API 请求
src/styles/           全站样式
server/               Express 后端
data/                 本地报名数据目录
legacy/               旧版静态 HTML 归档
```

## 本地运行

先安装依赖：

```bash
npm install
```

复制环境变量文件：

```bash
copy .env.example .env
```

启动后端接口：

```bash
npm run server
```

另开一个终端启动 Vue 开发服务器：

```bash
npm run dev
```

访问：

```text
前台：http://127.0.0.1:5510
后端：http://127.0.0.1:5511
```

如果本机没有安装系统版 Node.js，可以直接双击项目根目录的 `start-preview.cmd`，它会使用 `D:\网站制作\.tools` 里的便携 Node.js 启动预览。

## 公众号新闻同步

微信二维码本身不能直接提供历史文章列表。当前项目提供了半自动同步脚本，可以从已知文章链接抓取标题和发布时间：

```bash
node scripts/sync-wechat-news.mjs
```

后续如果能从公众号后台导出文章链接，或继续提供文章链接，把链接放进脚本的 `urls` 数组即可批量生成新闻数据。

## 管理员后台

默认账号密码在 `.env.example` 中：

```text
ADMIN_USERNAME=admin
ADMIN_PASSWORD=zt2026
```

正式使用前请复制到 `.env` 并修改密码和 `SESSION_SECRET`。

## 构建部署

```bash
npm run build
npm start
```

`npm start` 会运行后端，并在存在 `dist` 目录时托管构建后的 Vue 页面。

## GitHub 代码管理与 Pages 部署

当前仓库名使用 `zhongtang`。项目已配置 `.github/workflows/deploy-pages.yml`，推送到 GitHub 的 `main` 分支后会自动构建并发布到 GitHub Pages。

第一次上传代码：

```bash
git init
git add .
git commit -m "init zhongtang school website"
git branch -M main
git remote add origin https://github.com/Jasonzhou-u/zhongtang.git
git push -u origin main
```

在 GitHub 仓库中打开：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

部署完成后访问：

```text
https://Jasonzhou-u.github.io/zhongtang/
```

日常同步代码：

```bash
git status
git add .
git commit -m "说明本次修改"
git push
```

注意：GitHub Pages 只能托管前端静态页面。当前活动报名后台的 Express 接口适合后续部署到 Netlify、Render、学校服务器或云服务器；否则 GitHub Pages 上只能浏览前端，不能保存报名数据。
