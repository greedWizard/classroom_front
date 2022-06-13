<template>
<div class="modal fade" id="participationsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="participationsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="participationsModalLabel">Room members</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ol
            class="list-group list-group-numbered"
        >
            <li
                class="list-group-item d-flex justify-content-between align-items-start"
                v-for="participation in participations"
                :key="participation.id"
            >
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        {{ participation.user.first_name }} {{ participation.user.last_name }}
                    </div>
                    <p>Joined at: {{ participation.created_at }} <template v-if="participation.role === 'teacher'">{{ participation.user.email }}</template></p>
                </div>
                <template v-if="participation.role == 'teacher'">
                  <span
                    class="badge bg-primary rounded-pill"
                  >
                      {{ participation.role }}
                  </span>
                  <button
                      v-if="currentUser.id !== participation.user.id"
                      class="btn rounded-pill mr-4 btn-sm"
                      style="cursor: pointer;"
                      @click="redirectToDialog(participation.user.id)"
                      data-bs-dismiss="modal"
                  >
                      ✏️
                  </button>
                </template>
                <template v-else-if="myParticipation.can_remove_participants 
                                      && participation.user.id !== currentUser.id">
                    <span
                      class="badge bg-danger rounded-pill"
                      style="cursor: pointer;"
                      @click="removeParticipant(participation)"
                    >
                      remove
                  </span>
                </template>
            </li>
        </ol>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'


export default {
    computed: {
      ...mapGetters({
        currentUser: 'users/currentUser',
        myParticipation: 'participations/my',
        participations: 'participations/items',
      })
    },
    methods: {
      redirectToDialog(recieverId){
        this.$router.push({
          name: 'chat-dialog',
          query: {
            senderId: this.currentUser.id,
            recieverId: recieverId,
          }
        })
      },
      async removeParticipant(participation) {
        await store.dispatch('participations/delete', {
          roomId: participation.room_id,
          userId: participation.user.id,
        })
      }
    }
}
</script>

<style>

</style>