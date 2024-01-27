import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArtistDetail from '../views/ArtistDetail.vue'
import ArtistsList from '../views/ArtistsList.vue'
import Events from '../views/Events.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/artists',
    name: 'ArtistsList',
    component: ArtistsList,
  },
  {
    path: '/artists/:id',
    name: 'ArtistDetail',
    component: ArtistDetail,
    props: true,
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
