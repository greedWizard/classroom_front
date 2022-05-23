<template>
  <div>
      <h2>
          Welcome to chat
      </h2>
      {{ messages }} <br>
      <input type="text" v-model="message">
      <button class="btn btn-success" @click="sendMessage">Send message</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            webSocket: new WebSocket(
                `ws://localhost:8000/api/v1/chat/?jwt_token=${this.accessToken}`
            ),
            message: '',
            messages: [],
        }
    },
    computed: {
        ...mapGetters({
            accessToken: 'users/accessToken'
        }),
    },
    methods: {
        async sendMessage() {
            console.log(this.accessToken)
            const message = {
                jwt_token: this.accessToken,
                message: this.message,
            }
            this.webSocket.send(JSON.stringify(message))
        },
    },
    async created() {
        this.webSocket.onmessage = (event) => {
            const jsonData = JSON.parse(event.data)
            this.messages.push(jsonData)
        }
    }
}
</script>

<style>

</style>