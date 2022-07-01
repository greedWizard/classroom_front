<template>
  <div>
      <h2>Classroom</h2>
      <button
        class="btn btn-outline-secondary btn-sm mb-4"
        @click="$router.push({name: 'room-list'})"
    >Return to list</button>
    <hr>
    <RoomDetail />
  </div>
</template>

<script>
import store  from '@/store'
import { useRoute } from 'vue-router'
import RoomDetail from '@/components/rooms/RoomDetail.vue'

export default {
    components: {
        RoomDetail,
    },
    async setup(){
        const route = useRoute()
        await store.dispatch('rooms/getRoom', route.params.id)
        await store.dispatch('roomPosts/fetch', route.params.id)

        if(!store.getters['participations/my']) {
            await store.dispatch('participations/my', route.params.id)
        }
        store.commit(
            'rooms/SET_CAN_MODERATE',
            store.getters['rooms/item'].author.id === store.getters['users/currentUser'].id,
        )
        return {}
    },
    methods: {
        getet() {
            this.$store.dispatch
        }
    }
}
</script>

<style>

</style>