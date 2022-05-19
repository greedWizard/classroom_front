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
    <hr>
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
                        <button
                            class="btn btn-outline-success btn-sm mb-4"
                            data-bs-toggle="modal"
                            data-bs-target="#assignmentDetailModal"
                            @click="setAssignmentAttachments"
                        >
                            Show Homework
                        </button>
                        <AssignmentDetail />
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
        <div class="row d-flex align-items-end" >
           
        </div>
    </div>
</section>
</template>

<script>
import AttachmentsList from '@/components/roomposts/AttachmentsList'
import store from '@/store'
import AssignmentDetail from '../assignments/AssignmentDetail.vue'


export default {
    components: {
        AttachmentsList,
        AssignmentDetail,
    },
    props: {
        post: Object,
        type: String,
        user: Object,
    },
    created() {
        store.commit('attachments/SET_ITEMS', this.post.attachments)
    },
    computed: {
        allowEdit() {
            return this.user.id === this.post.author.id
        },
    },
    methods: {
        async setAssignmentAttachments() {
            var attachments = []

            if(this.post.assignment) {
                attachments = this.post.assignment.attachments
            }
            
            store.commit('attachments/SET_ITEMS', attachments)
        }
    }
}
</script>

<style>

</style>