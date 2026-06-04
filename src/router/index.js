import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PartnersView from '../views/PartnersView.vue'
import EventsView from '../views/EventsView.vue'
import SignupView from '../views/SignupView.vue'
import ViewsView from '../views/ViewsView.vue'
import SpaceDetailView from '../views/SpaceDetailView.vue'
import HallView from '../views/HallView.vue'
import AdminView from '../views/AdminView.vue'
import NewsView from '../views/NewsView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/news', name: 'news', component: NewsView },
  { path: '/news/:slug', name: 'news-detail', component: NewsDetailView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/partners', name: 'partners', component: PartnersView },
  { path: '/events', name: 'events', component: EventsView },
  { path: '/signup', name: 'signup', component: SignupView },
  { path: '/views', name: 'views', component: ViewsView },
  { path: '/views/:slug', name: 'space-detail', component: SpaceDetailView },
  { path: '/hall', name: 'hall', component: HallView },
  { path: '/admin', name: 'admin', component: AdminView }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
