<template>
  <div>
      <h2>Edit room</h2> <button
        class="btn btn-outline-secondary btn-sm mb-4"
        @click="$router.push({name: 'room-list'})"
    >Return to list</button> 
      <RoomEdit />
  </div>
</template>

<script>
import RoomEdit from '@/components/rooms/RoomEdit.vue'
import store  from '@/store'
import { useRoute } from 'vue-router'
import { mapGetters } from 'vuex'

export default {
    components: {
        RoomEdit,
    },
    computed: {
        ...mapGetters({
            room:'rooms/item'
        })
    },
    async setup() {
        const route = useRoute()
        await store.dispatch('rooms/getRoom', route.params.id)
        return {}
    },
}
</script>

<style>

</style>