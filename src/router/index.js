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
        path: ':roomId/roomPosts/:roomPostId/assignments',
        name: 'assigned-homeworks',
        component: AssignedHomeworks,
      },
      {
        path: 'list',
        name: 'room-list',
        component: RoomList,
      },
      {
        path: 'create',
        name: 'room-create',
        component: RoomCreate,
      },
      {
        path: ':id/edit',
        name: 'room-edit',
        component: RoomEdit,
      },
      {
        path: ':id',
        name: 'room-detail',
        component: RoomDetail,
      },
      {
        path: ':roomId/roomPosts/create-new',
        name: 'roomPost-create',
        component: RoomPostCreate,
      },
      {
        path: 'join/:join_slug',
        name: 'room-join',
        component: RoomJoin,
      },
      {
        path: ':roomId/roomPosts/:roomPostId',
        name: 'roomPost-detail',
        component: RoomPost,
      },
      {
        path: ':roomId/roomPosts/:roomPostId/update',
        name: 'roomPost-update',
        component: UpdateRoomPost,
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
