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


export default {
    components: {
        AssignmentListItem,
        AssignmentDetail
    },
    computed: {
        ...mapGetters({
            assignments: 'assignments/items',
        })
    },
}
</script>

<style>

</style>