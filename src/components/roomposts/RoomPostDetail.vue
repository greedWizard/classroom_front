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
                    <div v-if="myParticipation.can_assign_homeworks">
                        <AssignmentShowButton />
                        <div class="modal fade" id="assignmentDetailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="assignmentDetailModalLabel" aria-hidden="true">
                            <AssignmentDetail />
                        </div>
                    </div>
                    <button
                        class="btn btn-outline-success btn-sm mb-4"
                        @click="$router.push({
                            name: 'assigned-homeworks',
                            params: {
                                roomPostId: post.id ,
                                roomId: $route.params.roomId,
                            }
                        })"
                        v-if="myParticipation.can_examine"
                    >
                        Assigned Homeworks
                    </button>
                </div>
                <div v-if="post.attachments.length">
                    <p>{{ post.attachments.length }} files attached</p>
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
import store from '@/store'
import AttachmentsList from '@/components/roomposts/AttachmentsList'
import AssignmentDetail from '../assignments/AssignmentDetail.vue'
import AssignmentShowButton from '@/components/assignments/AssignmentDetailShowButton.vue'
import { mapGetters } from 'vuex'


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
    },
    mounted() {
        console.log(this.$route.params)
    },
    computed: {
        allowEdit() {
            return this.user.id === this.post.author.id
        },
        ...mapGetters({
            myParticipation: 'participations/my',
        })
    },
}
</script>

<style>

</style>