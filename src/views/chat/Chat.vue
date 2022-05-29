<template>
  <div>
      <TestChat />
  </div>
</template>

<script>
import TestChat from '@/components/chat/TestChat.vue'
import store  from '@/store'


export default {
    components: {
        TestChat,
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