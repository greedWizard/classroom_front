<template>
  <div>
    <div class="list-group">
      <div
        v-for="roomParticipation in roomParticipations.items"
        :key="roomParticipation.id"
      >
        <a
          href="#"
          class="list-group-item list-group-item-action flex-column align-items-start"
          :class="{ active: roomParticipation.is_moderator }"
          :id="'room#' + roomParticipation.room.id"
        >
          <div
            class="d-flex w-100 justify-content-between"
          >
            <h5 @click="goToRoom(roomParticipation.room.id)"
              class="mb-1">{{ roomParticipation.room.name }} &#128101; {{ roomParticipation.room.participations_count }}
            </h5><hr>
            <div v-if="roomParticipation.is_moderator">
              <small>
                <button
                  class="btn btn-success btn-sm"
                  @click="$router.push({ name: 'room-edit', params: { id: roomParticipation.room.id } })"
                >
                  Edit &#x270E;
                </button>
              </small> |
              <small>
                <button
                  class="btn btn-danger btn-sm mr-4"
                  @click="removeRoom(roomParticipation.room.id)"
                >
                  Dissolve
                </button>
              </small>
            </div>
          </div>
          <div @click="goToRoom(roomParticipation.room.id)">
            <div>
              Created: {{ roomParticipation.room.author.first_name }}  {{ roomParticipation.room.author.last_name }}
            </div> <hr>
            <p class="mb-1">{{ roomParticipation.room.description }}</p>
            <small>{{ roomParticipation.room.created_at }} </small>
          </div>
        </a>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'


export default {
  data() {
    return {
      filteredRooms: store.getters['rooms/items'],
    }
  },
  computed: {
    ...mapGetters({
      roomParticipations: 'rooms/items',
    }) 
  },
  methods: {
    ...mapActions({
      deleteRoom: 'rooms/deleteRoom',
    }),
    async goToRoom(roomId) {
      this.$router.push({ name: 'room-detail', params: { id: roomId } })
    },
    async removeRoom(roomId) {
      alert('Room deleted')
      await this.deleteRoom(roomId)
      store.commit('rooms/SET_ITEMS', this.rooms.filter(e => e.id !== roomId))
      this.filteredRooms = this.filteredRooms.filter(e => e.id !== roomId)
    }
  },
}
</script>

<style scoped>

</style>