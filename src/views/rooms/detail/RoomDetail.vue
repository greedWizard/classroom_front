<template>
  <div>
      <h2>Classroom</h2>
      <button
        class="btn btn-outline-secondary btn-sm mb-4"
        @click="$router.push({name: 'room-list'})"
    >Return to list</button>
      <RoomDetail :room="room" :currentUser="user"/>
  </div>
</template>

<script>
import store  from '@/store'
import { useRoute } from 'vue-router'
import RoomDetail from '@/components/rooms/RoomDetail.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        RoomDetail,
    },
    computed: {
        ...mapGetters({
            room: 'rooms/item',
            user: 'users/currentUser',
        })
    },
    async setup(){
        const route = useRoute()
        await store.dispatch('rooms/getRoom', route.params.id)
        await store.dispatch('users/getCurrentUser')
        return {}
    }
}
</script>

<style>

</style>