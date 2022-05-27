<template>
    <div>
        <h2>
            Classrooms
            <a
              @click="goToCreate"
            >
                <button type="button" class="ml-4 btn btn-outline-primary">+</button>
            </a>
        </h2>
        <hr>
        <RoomList />
    </div>
</template>

<script>
import RoomList from '@/components/rooms/RoomList.vue'
import store  from '@/store'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        RoomList
    },
    computed: {
        ...mapGetters({
            rooms: 'rooms/items',
        })
    },
    methods: {
      ...mapActions({
        setTab: 'tabs/setTab',
      }),
      goToCreate(e) {
          e.preventDefault()
          this.$router.push({ name: 'room-create' })
      }
    },
    async setup() {
      await store.dispatch('rooms/getRooms')
      return {}
    },
}
</script>

<style>

</style>