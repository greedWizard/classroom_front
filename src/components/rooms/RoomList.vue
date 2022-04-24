<template>
  <div>
    <div class="list-group">
      <div v-for="room in rooms" :key="room.id">
        <a
          href="#"
          class="list-group-item list-group-item-action flex-column align-items-start"
          :class="{ active: room.participation.role === 'host' }"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ room.name }} &#128101; {{ room.participations_count }} </h5><hr>
            <small v-if="room.participation.role === 'host'">
              <button
                class="btn btn-light btn-sm ml-4"
                @click="deleteRoom(room.id)"
              >
                Dissolve
              </button>
            </small>
          </div>
          <p class="mb-1">{{ room.description }}</p>
          <small>{{ room.created_at }} </small>
        </a>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
  props: {
    rooms: Array,
  },
  methods: {
    ...mapActions({
      deleteRoom: 'rooms/deleteRoom',
    }),
    // async deleteRoomById(roomId) {

    // }
  }
}
</script>

<style scoped>

</style>