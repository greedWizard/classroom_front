<template>
  <div>
    <h2>
          Create new room
    </h2>
    <button
        class="btn btn-outline-secondary btn-sm"
        @click="$router.push({name: 'room-list'})"
    >Return to list</button>
    <hr> 
      <RoomCreate />
  </div>
</template>

<script>
import RoomCreate from '@/components/rooms/RoomCreate.vue'

export default {
    components: {
        RoomCreate,
    }
}
</script>

<style>

</style>