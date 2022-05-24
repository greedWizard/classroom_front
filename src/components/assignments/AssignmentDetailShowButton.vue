<template>
<button
    class="btn btn-outline-success btn-sm mb-4"
    data-bs-toggle="modal"
    data-bs-target="#assignmentDetailModal"
    @click="setAssignmentAttachments"
>
    Show Homework
</button>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'


export default {
    computed: {
        ...mapGetters({
            assignment: 'assignments/item',
        }),
    },
    methods: {
        async setAssignmentAttachments() {
            var attachments = []

            if(this.assignment) {
                attachments = this.assignment.attachments
            }

            store.commit('attachments/SET_ITEMS', attachments)
        }
    }
}
</script>

<style>

</style>