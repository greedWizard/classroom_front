<template>
  <div>
      <h2>
          Welcome to chat
      </h2>
  </div>
</template>

<script>
export default {
    async created() {
        const webSocket = new WebSocket('ws://localhost:8000/api/v1/chat/')
        webSocket.send('{ "message": "hello" }')
    }
}
</script>

<style>

</style>