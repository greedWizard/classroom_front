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
import RoomCreate from '../views/rooms/RoomCreate.vue'
import RoomEdit from '../views/rooms/detail/RoomEdit.vue'
import RoomDetail from '../views/rooms/detail/RoomDetail.vue'
import RoomJoin from '../views/rooms/RoomJoin.vue'
import RoomPostCreate from '../views/rooms/roomposts/CreateRoomPost.vue'
import RoomPost from '../views/rooms/roomposts/RoomPostDetail.vue'
import UpdateRoomPost from '../views/rooms/roomposts/UpdateRoomPost.vue'
import AssignedHomeworks from '@/views/rooms/assignments/AssignedHomeworks'
import TestChat from '@/components/chat/TestChat.vue'

import store from '@/store'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { loginRequired: false },
  },
  {
    path: '/chat/test',
    name: 'test-chat',
    component: TestChat,
    meta: { loginRequired: true },
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: RoomIndex,
    meta: { loginRequired: true },
    children: [
      {
        path: ':roomId/roomPosts/:roomPostId/assignments',
        name: 'assigned-homeworks',
        component: AssignedHomeworks,
        meta: { loginRequired: true },
      },
      {
        path: 'list',
        name: 'room-list',
        component: RoomList,
        meta: { loginRequired: true },
      },
      {
        path: 'create',
        name: 'room-create',
        component: RoomCreate,
        meta: { loginRequired: true },
      },
      {
        path: ':id/edit',
        name: 'room-edit',
        component: RoomEdit,
        meta: { loginRequired: true },
      },
      {
        path: ':id',
        name: 'room-detail',
        component: RoomDetail,
        meta: { loginRequired: true },
      },
      {
        path: ':roomId/roomPosts/create-new',
        name: 'roomPost-create',
        component: RoomPostCreate,
        meta: { loginRequired: true },
      },
      {
        path: 'join/:join_slug',
        name: 'room-join',
        component: RoomJoin,
        meta: { loginRequired: true },
      },
      {
        path: ':roomId/roomPosts/:roomPostId',
        name: 'roomPost-detail',
        component: RoomPost,
        meta: { loginRequired: true },
      },
      {
        path: ':roomId/roomPosts/:roomPostId/update',
        name: 'roomPost-update',
        component: UpdateRoomPost,
        meta: { loginRequired: true },
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
        meta: { loginRequired: false, logoutRequired: true },
      },
      {
        path: 'login',
        name: 'login',
        component: LogIn,
        meta: { loginRequired: false, logoutRequired: true },
      },
      {
        path: 'logout',
        name: 'logout',
        component: LogOut,
        meta: { loginRequired: true },
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
            meta: { loginRequired: true },
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
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.loginRequired)) {
    if (store.getters['users/isAuthenticated']) {
      next()
      return
    }
    next('/users/login')
  } else if(to.matched.some(record => record.meta.logoutRequired)) {
    if (!store.getters['users/isAuthenticated']) {
      next()
      return
    }
    next('/users/profile/current')
  } else next()
})

export default router
