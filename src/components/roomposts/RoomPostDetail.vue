<template>
<section class="vh-100">
    <div class="mb-4">
        <h3>{{ post.title }}</h3>
        <button
            class="btn btn-outline-secondary btn-sm"
            @click="$router.push({name: 'room-detail', params: { id: $route.params.roomId }})"
        >
            Return to room
        </button>
    </div> <hr>
    <div class="container">
        <div class="row d-flex align-items-center" >
            <div>
                <h4>{{ post.description || 'No description' }}</h4>
            </div>

            <div class="col-md-7 col-lg-5 col-xl-5 ">
                <hr>

                <div v-if="post.text" class="row d-flex align-items-center">
                    <p>{{ post.text || 'No text' }}</p>
                </div>
                <div v-if="post.type === 'homework'" class="row d-flex align-items-center">
                    <div v-if="!allowEdit">
                        <AssignmentShowButton />
                        <div class="modal fade" id="assignmentDetailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="assignmentDetailModalLabel" aria-hidden="true">
                            <AssignmentDetail />
                        </div>
                    </div>
                    <button
                        class="btn btn-outline-success btn-sm"
                        @click="$router.push({
                            name: 'assigned-homeworks',
                            params: {
                                roomPostId: post.id ,
                                roomId: $route.params.roomId,
                            } 
                        })"
                        v-else-if="allowEdit"
                    >
                        Assigned Homeworks
                    </button>
                </div>
                <div v-if="post.attachments.length">
                    <p>{{ post.attachments.length }} attached files</p>
                    <div class="form-outline mb-4">
                        <AttachmentsList
                            :allowEdit="false"
                        />
                    </div>
                </div>
                <div v-else>
                    <p>No files attached</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import AttachmentsList from '@/components/roomposts/AttachmentsList'
import store from '@/store'
import AssignmentDetail from '../assignments/AssignmentDetail.vue'
import AssignmentShowButton from '@/components/assignments/AssignmentDetailShowButton.vue'


export default {
    components: {
        AttachmentsList,
        AssignmentDetail,
        AssignmentShowButton,
    },
    props: {
        post: Object,
        type: String,
        user: Object,
    },
    created() {
        store.commit('attachments/SET_ITEMS', this.post.attachments)
        store.commit('assignments/SET_ITEM', this.post.assignment)
    },
    computed: {
        allowEdit() {
            return this.user.id === this.post.author.id
        },
    },
}
</script>

<style>

</style>