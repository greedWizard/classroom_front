<template>
  <div>
        <h2>Homework assignments</h2>
        <button
            class="btn btn-outline-secondary btn-sm"
            @click="$router.push({
                name: 'roomPost-detail',
                params: { id: $route.params.roomPostId }
            })"
        >Return to homework</button>
        <hr>
        <assignments-list />
  </div>
</template>

<script>
import AssignmentsList from '@/components/assignments/AssignmentsList.vue'
import store from '@/store'
import { useRoute } from 'vue-router'


export default {
    components: { AssignmentsList },
    async setup() {
        const route = useRoute()
        await store.dispatch('assignments/fetchForTeacher', route.params.roomPostId)
    }
}
</script>

<style>

</style>