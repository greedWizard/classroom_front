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
</th>
</template>

<script>
export default {
    props: {
        assignment: Object,
    }
}
</script>

<style>

</style>