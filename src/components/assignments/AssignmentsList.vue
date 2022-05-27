<template>
<div class="container">
    <div class="row d-flex align-items-end">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Middle name</th>
                    <th scope="col">Assigned at</th>
                    <th scope="col">Status</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="assignment in assignments" :key="assignment.id">
                    <AssignmentListItem :assignment="assignment" />
                </tr>
            </tbody>
        </table>
    </div>
    <div class="modal fade" id="assignmentDetailModal2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="assignmentDetailModalLabel" aria-hidden="true">
        <AssignmentDetail />
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AssignmentListItem from '@/components/assignments/AssignmentListItem.vue'
import AssignmentDetail from '../assignments/AssignmentDetail.vue'
import store from '@/store'
import { useRoute } from 'vue-router'


export default {
    components: {
        AssignmentListItem,
        AssignmentDetail
    },
    computed: {
        ...mapGetters({
            assignments: 'assignments/items',
            assignment: 'assignments/item',
            attachments: 'attachments/items',
        })
    },
    async setup() {
        const route = useRoute()
        const roomPost = store.getters['roomPosts/item']
        
        if(Object.keys(roomPost).length === 0) {
            store.dispatch('roomPosts/get', route.params.roomPostId)
        }
    }
}
</script>

<style>

</style>