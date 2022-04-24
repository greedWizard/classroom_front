import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/users/Register.vue'
import LogIn from '../views/users/LogIn.vue'
import UserIndex from '../views/users/UserIndex.vue'
import CurrentUser from '../views/users/profile/CurrentUser.vue'
import ProfileIndex from '../views/users/profile/ProfileIndex.vue'
import LogOut from '../views/users/LogOut.vue'
import RoomIndex from '../views/rooms/RoomIndex.vue'
import RoomList from '../views/rooms/RoomList.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: RoomIndex,
    children: [
      {
        path: 'list',
        name: 'room-list',
        component: RoomList,
      }
    ]
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
      {
        path: 'logout',
        name: 'logout',
        component: LogOut,
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileIndex,
        children: [
          {
            path: 'current',
            name: 'currentUser',
            component: CurrentUser,
          }
        ]
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
