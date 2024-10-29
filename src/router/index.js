import { createRouter, createWebHistory } from 'vue-router';
import UserComponent from '../components/UserComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UserComponent
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
