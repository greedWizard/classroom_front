<template>
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="assignmentDetailModalLabel">
                {{ roomPost.title }}
                <span
                    class="badge rounded-pill"
                    :class="{
                        'bg-success': assignment.status === 'done',
                        'bg-secondary': !assignment.status,
                        'bg-danger': assignment.status === 'changes requested',
                        'bg-primary': assignment.status === 'assigned',
                    }"
                >
                    {{ assignment.status || 'Not turned in' }}
                </span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="myParticipation">
            <AssignmentCreate v-if="myParticipation.can_assign_homeworks" />
            <AssignmentTeacherInfo v-else />
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="returnAttachmentsFromRoomPost"
            >
                Close
            </button>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AssignmentCreate from '@/components/assignments/AssignmentCreate'
import AssignmentTeacherInfo from '@/components/assignments/AssignmentTeacherInfo.vue'
import store from '@/store'

export default {
    components: {
        AssignmentCreate,
        AssignmentTeacherInfo,
    },
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
            currentUser: 'users/currentUser',
            roomPost: 'roomPosts/item',
            myParticipation: 'participations/my',
        }),
    },
    methods: {
        async returnAttachmentsFromRoomPost() {
            store.commit('attachments/SET_ITEMS', this.roomPost.attachments)
        },
    },
    async created() {
        store.commit('assignments/SET_ITEM', this.roomPost.assignment || {})
    },
}
</script>

<style>

</style>