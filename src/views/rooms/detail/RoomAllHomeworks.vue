<template>
    <div>
        <h1>Здесь все ваши домашние работы</h1>
        <hr>
        <assignments-list />
    </div>
</template>

<script>
import AssignmentsList from '@/components/assignments/AssignmentsList.vue'
//import store from '@/store'
import { useRoute } from 'vue-router'
//import { mapGetters } from 'vuex'

export default {
    components: {
        AssignmentsList
    },
    async setup() {
        const route = useRoute()
        // await store.dispatch('assignments/fetchForTeacher', route.params.roomPostId)
        return {
            route
        }
    },
        methods: {

    },
    computed: {
        // ...mapGetters({
        //     assignments: 'assignments/items',
        // })
    }
}
</script>

<style scoped>

</style>