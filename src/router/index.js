// 路由配置文件
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/data',
    name: 'DataVisualization',
    component: () => import('../views/DataVisualization.vue')
  },
  {
    path: '/algorithm',
    name: 'AlgorithmExplanation',
    component: () => import('../views/AlgorithmExplanation.vue')
  },
  {
    path: '/model',
    name: '3DModel',
    component: () => import('../views/Model3D.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 