<template>
<div class="list-group">
    <a
        href="#"
        class="list-group-item list-group-item-action"
        :class="{ 'list-group-item-secondary': currentUser.id !== message.sender.id }"
        v-for="message in messages"
        :key="message.id"
        @click="$router.push({
            name: 'chat-dialog',
            query: {
                recieverId: message.dialog.reciever.id,
                senderId: message.dialog.sender.id,
            }
        })"
    >
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">
                {{ message.sender.id === currentUser.id ? message.reciever.full_name : message.sender.full_name }}
            </h5>
            <small class="text-muted">{{ moment(message.created_at).fromNow() }}</small>
        </div>
        <p class="mb-1">{{ message.text }}</p>
    </a>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'


export default {
    computed: {
        ...mapGetters({
            messages: 'chat/messages',
            moment: 'common/moment',
            currentUser: 'users/currentUser',
        })
    },
    async setup() {
        if(!store.getters['users/currentUser']){
            await store.dispatch('users/getCurrentUser')
        }
    }
}
</script>

<style>

</style>