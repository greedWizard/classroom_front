<template>
  <div>
      <RoomPostCreate :initialPost="{}"/>
  </div>
</template>

<script>
import RoomPostCreate from '@/components/roomposts/RoomPostCreate.vue'
import store from '@/store'
import { useRoute } from 'vue-router'


export default { 
    components: {
        RoomPostCreate
    },
    async setup() {
        const route = useRoute()
        store.commit('roomPosts/SET_ITEM', { type: route.query.type })
    }
}
</script>

<style>

</style>