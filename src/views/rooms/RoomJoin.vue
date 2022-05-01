<template>
  <div>
    <h2>
      You are joined the room! 
    </h2>
    <router-link :to="{name: 'room-list'}">Go to room list</router-link>
  </div>
</template>

<script>
import store  from '@/store'
import { useRoute } from 'vue-router'

export default {
    async setup(){
        const route = useRoute()
        await store.dispatch('rooms/join', route.params.join_slug)
        return {}
    },
}
</script>

<style>

</style>