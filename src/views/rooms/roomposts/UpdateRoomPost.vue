<template>
  <div>
      <RoomPostCreate :initialPost="roomPost"/>
  </div>
</template>

<script>
import RoomPostCreate from '@/components/roomposts/RoomPostCreate.vue'
import { useRoute } from 'vue-router'
import store  from '@/store'
import { mapGetters } from 'vuex'


export default {
    components: {
        RoomPostCreate,
    },
    computed: {
        ...mapGetters({
            roomPost: 'roomPosts/item'
        })
    },
    async setup() {
        const route = useRoute()
        await store.dispatch('roomPosts/get', route.params.roomPostId)
    }
}
</script>

<style>

</style>