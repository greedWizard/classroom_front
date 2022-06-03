<template>
  <div>
        <h2>Dialog</h2>
        <button
            class="btn btn-outline-secondary btn-sm"
            @click="$router.back()"
        >Back</button> <hr>
      <ChatBox />
  </div>
</template>

<script>
import ChatBox from '@/components/chat/ChatBox.vue'
import store  from '@/store'


export default {
    components: {
        ChatBox,
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