<template>
    <div>
        <h1>Здесь все ваши домашние работы</h1>
        <button
        class="btn btn-outline-secondary btn-sm mb-4"
        @click="$router.push(`/rooms/${$route.params.roomId}`)"
        >вернуться в комнату</button>
        <hr>
        <assignments-list />
    </div>
</template>

<script>
import AssignmentsList from '@/components/assignments/AssignmentsList.vue'
import store from '@/store'
import { useRoute } from 'vue-router'

export default {
    components: {
        AssignmentsList
    },
    async setup() {
        const route = useRoute()
        await store.dispatch('assignments/getRoomAssigments', route.params.roomId)
    },
    methods: {
    },
}
</script>

<style scoped>
</style>