<template>
  <div>
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
        store.dispatch('tabs/setTab', 'dialogs')
        if(!store.getters['users/currentUser']){
            await store.dispatch('users/getCurrentUser')
        }
    }
}
</script>

<style>

</style>