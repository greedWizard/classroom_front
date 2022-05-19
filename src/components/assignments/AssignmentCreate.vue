<template>
  <div>
    <div class="col-md-7 col-lg-5 col-xl-9">
        <h3 v-if="!assignment.id">Turn in your homework</h3>
        <h3 v-else-if="assignment.status === 'assigned'">Your homework is assigned</h3>
        <h3 v-else-if="assignment.status === 'request changes'">Assigned homework needs some changes, read the remark</h3>
        <h3 v-else-if="assignment.status === 'done'">Your homework is done</h3>

        <template v-if="assignment.comment">
            <span>Teacher's remark: {{ assignment.comment }}</span>
        </template>

        <p class="mb-4">Attach files with your homework</p>
        <div class="mb-3">
            <AttachmentControl :multiple="true" />
            <AttachmentsList :allowEdit="true" />
        </div>
        <div class="d-grid gap-2">
            <button
                class="btn btn-outline-success btn-sm"
                type="button"
                @click="createAssignment"
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
        })
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
            }

            if(this.assignment.id) {
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