<template>
  <div>
    <div class="col-md-7 col-lg-5 col-xl-9">
        <template v-if="myParticipation.can_assign_homeworks">
            <h3 v-if="!assignment.id">Turn in your homework</h3>
            <h3 v-else-if="assignment.status_assigned">Your homework is assigned</h3>
            <h3 v-else-if="assignment.request_changes">Assigned homework needs some changes, read the remark</h3>
            <h3 v-else-if="assignment.status_done">Your homework is done</h3>
        </template>
        <span
            v-if="assignment.comment"
            class="link-danger mb-4"
        >Teacher's remark: "{{ assignment.comment }}"</span>

        <div class="mb-4 mt-2">
            <div v-if="!isBlocked">
                <p class="mb-4">Attach files with your homework</p>
                <AttachmentControl :multiple="true" v-show="!isBlocked"/>
            </div>
            <div v-else>
                <span>You got {{ assignment.rate }} / 5</span>
            </div>
        </div>
        <div class="mb-3">
            <AttachmentsList :allowEdit="!isBlocked" />
        </div>
        <div class="d-grid gap-2">
            <button
                class="btn btn-outline-success btn-sm"
                type="button"
                @click="createAssignment"
                v-show="!isBlocked"
            >
                Submit
            </button>
        </div>
    </div>
</div>
</template>

<script>
import AttachmentControl from '@/components/attachments/AttachmentControl.vue'
import AttachmentsList from '@/components/roomposts/AttachmentsList.vue'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
    components: {
        AttachmentControl,
        AttachmentsList,
    },
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
            attachments: 'attachments/items',
            myParticipation: 'participations/my',
        }),
        isBlocked() {
            return this.assignment.status === 'done'
        }
    },
    methods: {
        async createAssignment() {
            const attachmentsToUpload = this.attachments.filter(attachment => !attachment.id)

            if(!this.assignment.id) {
                await store.dispatch(
                    'assignments/create',
                    {
                        assigned_room_post_id: this.$route.params.roomPostId,
                    }
                )
            } else if (this.assignment.status == 'changes requested') {
                await store.dispatch('assignments/reassign', this.assignment.id)
            }

            if(this.assignment.id && attachmentsToUpload.length) {
                alert('Create success')

                await store.dispatch(
                    'assignments/attachFiles',
                    {
                        assignmentId: this.assignment.id,
                        requestBody: {
                            attachments: attachmentsToUpload,
                        }
                    }
                )
            }
        }
    }
}
</script>

<style>

</style>