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
            <h5 class="mb-1">{{ room.name }}</h5>
            <small>
              {{ room.created_at }}
              <button class="btn btn-light btn-sm">
                Dissolve
              </button>
            </small>
          </div>
          <p class="mb-1">{{ room.description }}</p>
          <small>{{ room.participations_count }} participants including you </small>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rooms: Array,
  }
}
</script>

<style>

</style>