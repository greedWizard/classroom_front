import { createStore } from 'vuex'
import * as rooms from '@/store/modules/rooms.js'
import * as users from '@/store/modules/users.js'
import * as tabs from '@/store/modules/tabs.js'
import * as roomPosts from '@/store/modules/roomPosts.js'
import * as participations from '@/store/modules/participations.js'
import * as attachments from '@/store/modules/attachments.js'


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    rooms, users, tabs,
    roomPosts, participations,
    attachments,
  }
})
