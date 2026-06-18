import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue';
import HomeView from '../views/HomeView.vue'
import MoviesView from '@/views/MoviesView.vue'
import MovieDetailView from '../views/MovieDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
    },
    {
      path: '/movies/:id',
      name: 'movie-detail',
      component: MovieDetailView,
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'not-found',
      component: NotFoundView
    }
  ],
})

export default router
