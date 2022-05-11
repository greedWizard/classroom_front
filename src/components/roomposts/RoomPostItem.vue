<template>
<div class="card mb-4 border border-dark shadow">
  <div class="card-body h-100 row align-items-center">
    <div
      class="roomPostHeader mb-4"
      data-toggle="modal"
      data-target="#roomPostDetailModal"
      @click="$router.push({ name: 'roomPost-detail', params: { roomId: roomPost.room_id, roomPostId: roomPost.id } })"
    >
      <h5 class="card-title mb-2 ">{{ roomPost.title || 'Untitled'}}</h5>
      <span class="card-subtitle mb-4 text-muted">
        {{ moment(roomPost.created_at).format('LLLL') }}
      </span>
      <p class="card-text mb-4">{{ roomPost.description || 'No description' }}</p>
      <p class="card-text mb-4">{{ roomPost.attachments_count }} files attached</p>
      <template v-if="roomPost.text">
        <p v-if="roomPost.text.length <= 100">{{ roomPost.text }}</p>
        <p v-else-if="roomPost.text.length > 100">{{ roomPost.text.substring(0, 50) }}...</p>
      </template>
    </div>
    <template v-if="canModerate">
      <button
        class="btn btn-outline-success btn-sm mb-2 shadow-sm"
        @click="$router.push({
            name: 'roomPost-update',
            params: { roomId: roomPost.room_id, roomPostId: roomPost.id }
        })"
      >Edit</button>
      <button
        @click="deleteRoomPost(roomPost)"
        class="btn btn-outline-danger btn-sm shadow-sm"
      >Delete</button>
    </template>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        roomPost: Object,
        attachments: Array,
    },
    data() {
      return {
        moment: moment,
      }
    },
    computed: {
      ...mapGetters({
        canModerate: 'rooms/canModerate',
      })
    },
    methods: {
      ...mapActions({
        deleteRoomPost: 'roomPosts/delete'
      }),
    }
}
</script>

<style>
.roomPostHeader {
  cursor: pointer;
}
</style>