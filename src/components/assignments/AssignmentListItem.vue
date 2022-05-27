<template>
<th scope="row">{{ assignment.author.first_name }}</th>
<th>{{ assignment.author.last_name }}</th>
<th>{{ assignment.author.middle_name || '-' }}</th>
<th>{{ assignment.created_at }}</th>
<th>
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
</th>
<th>{{ assignment.rate || '-' }}</th>
<th>
    <span
        @click="$router.push({
            name: 'roomPost-detail',
            params: $route.params,
        })"
        class="badge rounded-pill bg-secondary mb-4"
        style="cursor: pointer; margin-left: 1rem;"
    >
        Go to homework post
    </span>
    <span
        class="badge rounded-pill bg-success mb-4"
        data-bs-toggle="modal"
        data-bs-target="#assignmentDetailModal2"
        @click="setAssignment"
        style="cursor: pointer; margin-left: 1rem;"
    >
        Show Homework
    </span>
</th>
</template>

<script>
import store from '@/store'

export default {
    components: {
    },
    props: {
        // TODO: Переименовать в assignmentRow
        assignment: Object,
    },
    methods: {
        async setAssignment() {
            // store.commit('assignments/SET_ITEM', this.assignment)
            await store.dispatch('assignments/get', this.assignment.id)
            store.commit('attachments/SET_ITEMS', store.getters['assignments/item'].attachments || [])
        }
    }
}
</script>

<style>

</style>