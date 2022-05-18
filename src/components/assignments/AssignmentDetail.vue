<template>
<div class="modal fade" id="assignmentDetailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="assignmentDetailModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="assignmentDetailModalLabel">Homework Assignment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <AssignmentCreate  v-if="!assignment"/>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success">Submit</button>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AssignmentCreate from '@/components/assignments/AssignmentCreate'

export default {
    components: {
        AssignmentCreate
    },
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
            currentUser: 'users/currentUser'
        })
    }
}
</script>

<style>

</style>