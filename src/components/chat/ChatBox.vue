<template>
<div class="header">
    <hr>
</div>
<div class="container">
    <div class="list-group border border-secondary overflow-auto" style="max-height: 40rem;">
        <span 
            class="list-group-item mb-2"
            aria-current="true"
            v-for="message in messages"
            :key="message.id"
        >
            <div
                class="d-flex w-100 justify-content-between mb-2"
                :class="{
                    'bg-secondary text-white': currentUser.id !== message.sender.id,
                    'bg-info text-dark': currentUser.id === message.sender.id,
                }"
            >
                <h5 class="mb-1">{{ message.sender.full_name }}</h5>
                <small>{{ moment(message.created_at).fromNow() }}</small>
            </div>
            <p class="mb-1">{{ message.text }}</p>
        </span>
    </div>
    <hr>
    <div class="d-flex w-100 justify-content-between">
        <input type="text" v-model="message" class="form-control" @keyup.enter="sendMessage">
        <button class="btn btn-sm btn-outline-success" @click="sendMessage">Send</button>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import moment from 'moment'
import { WS_URL } from '@/logic/config'

export default {
    data() {
        const recieverId = this.$route.query.recieverId
        const senderId = this.$route.query.senderId
        const wsConnectionString = `${WS_URL}/api/v1/chat/?jwt_token=${store.getters['users/accessToken']}&reciever_id=${recieverId}&sender_id=${senderId}`
        return {
            webSocket: new WebSocket(wsConnectionString),
            message: '',
            messages: [],
            moment: moment,
        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'users/currentUser',
        }),
    },
    methods: {
        async sendMessage() {
            const message = {
                jwt_token: this.accessToken,
                message: this.message,
            }
            this.webSocket.send(JSON.stringify(message))
            this.message = ''
        },
    },
    async created() {
        this.webSocket.onmessage = (event) => {
            const jsonData = JSON.parse(event.data)
            this.messages = jsonData
        }
    },
}
</script>

<style>

</style>