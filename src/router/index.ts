import { createRouter, createWebHistory } from 'vue-router';
import AnnouncementsView from '../views/AnnouncementsView.vue';
import MaterialsView from '../views/MaterialsView.vue';
import PostsView from '../views/PostsView.vue';
import SupportView from '../views/SupportView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostsView
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: AnnouncementsView
    },
    {
      path: '/materials',
      name: 'materials',
      component: MaterialsView
    },
    {
      path: '/support',
      name: 'support',
      component: SupportView
    }
  ]
});

export default router;
