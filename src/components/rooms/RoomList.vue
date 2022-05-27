<template>
  <div>
    <SearchByField 
      :target="rooms"
      :fieldName="'name'"
      @onFilter="value => {this.filteredRooms = value}" 
    />
    <div class="list-group">
      <div
        v-for="room in filteredRooms"
        :key="room.id"
      >
        <a
          href="#"
          class="list-group-item list-group-item-action flex-column align-items-start"
          :class="{ active: room.is_moderator }"
          :id="'room#' + room.id"
        >
          <div
            class="d-flex w-100 justify-content-between"
          >
            <h5 @click="goToRoom(room.id)"
              class="mb-1">{{ room.name }} &#128101; {{ room.participations_count }}
            </h5><hr>
            <div v-if="room.is_moderator">
              <small>
                <button
                  class="btn btn-success btn-sm"
                  @click="$router.push({ name: 'room-edit', params: { id: room.id } })"
                >
                  Edit &#x270E;
                </button>
              </small> |
              <small>
                <button
                  class="btn btn-danger btn-sm mr-4"
                  @click="removeRoom(room.id)"
                >
                  Dissolve
                </button>
              </small>
            </div>
          </div>
          <div @click="goToRoom(room.id)">
            <div>
              Created: {{ room.author.first_name }}  {{ room.author.last_name }}
            </div> <hr>
            <p class="mb-1">{{ room.description }}</p>
            <small>{{ room.created_at }} </small>
          </div>
        </a>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SearchByField from '@/components/SearchByField.vue'
import store from '@/store'


export default {
  components: {
    SearchByField,
  },
  data() {
    return {
      filteredRooms: store.getters['rooms/items'],
    }
  },
  computed: {
    ...mapGetters({
      rooms: 'rooms/items',
    }) 
  },
  methods: {
    ...mapActions({
      deleteRoom: 'rooms/deleteRoom',
      rooms: 'rooms/items',
    }),
    async goToRoom(roomId) {
      this.$router.push({ name: 'room-detail', params: { id: roomId } })
    },
    async removeRoom(roomId) {
      alert('Room deleted')
      await this.deleteRoom(roomId)
      store.commit('rooms/SET_ITEMS', this.rooms.filter(e => e.id !== roomId))
    }
  },
}
</script>

<style scoped>

</style>