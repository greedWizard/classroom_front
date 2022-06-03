<template>
<div class="container">
    <h2>My dialogs</h2>
    <button
        class="btn btn-outline-secondary btn-sm"
        @click="$router.back()"
    >Back</button> <hr>
    <DialogList />
</div>
</template>

<script>
import DialogList from '@/components/chat/DialogList.vue'
import store from '@/store'

export default {
    components: {
        DialogList,
    },
    async setup() {
        await store.dispatch('chat/fetch')
    }
}
</script>

<style>

</style>