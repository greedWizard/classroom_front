<template>
  <div>
      <RoomPostCreate :title="homework" />
  </div>
</template>

<script>
import RoomPostCreate from '@/components/roomposts/RoomPostCreate.vue'


export default {
    components: {
        RoomPostCreate
    }
}
</script>

<style>

</style>