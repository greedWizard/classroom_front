import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/users/Register.vue'
import LogIn from '../views/users/LogIn.vue'
import UserIndex from '../views/users/UserIndex.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'users',
    component: UserIndex,
    children: [
      {
        path: 'registration',
        name: 'registration',
        component: Register,
      },
      {
        path: 'login',
        name: 'login',
        component: LogIn,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
