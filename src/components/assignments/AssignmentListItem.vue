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
    <router-link
        :to="{
            name: 'roomPost-detail',
            params: $route.params,
        }"
        class="link-secondary"
    >
        Go to homework post
    </router-link>
    <button
        class="btn btn-outline-success btn-sm mb-4"
        data-bs-toggle="modal"
        data-bs-target="#assignmentDetailModal2"
        @click="setAssignment"
    >
        Show Homework
    </button>
</th>
</template>

<script>
import store from '@/store'


export default {
    components: {
    },
    props: {
        assignment: Object,
    },
    methods: {
        async setAssignment() {
            store.commit('assignments/SET_ITEM', this.assignment)
            store.commit('attachments/SET_ITEMS', this.assignment.attachments || [])
            console.log(this.assignment.attachments)
        }
    }
}
</script>

<style>

</style>