<template>
  <div>
    <div class="list-group">
      <div
        v-for="room in rooms"
        :key="room.id"
      >
        <a
          href="#"
          class="list-group-item list-group-item-action flex-column align-items-start"
          :class="{ active: room.participation.role === 'host' }"
          :id="'room#' + room.id"
        >
          <div
            class="d-flex w-100 justify-content-between"
          >
            <h5 @click="$router.push({ name: 'room-detail', params: { id: room.id } })"
              class="mb-1">{{ room.name }} &#128101; {{ room.participations_count }}
            </h5><hr>
            <div v-if="room.participation.role === 'host'">
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
                  @click="deleteRoom(room.id)"
                >
                  Dissolve
                </button>
              </small>
            </div>
          </div>
          <div>
            Created: {{ room.author.first_name }}  {{ room.author.last_name }}
          </div> <hr>
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
  }
}
</script>

<style scoped>

</style>